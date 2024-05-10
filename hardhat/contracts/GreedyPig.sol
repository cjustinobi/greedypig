// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GreedyPig {

    address public owner;
    uint public gameId;

    enum GameStatus {
        New,
        InProgress,
        Ended 
    }

    
    struct Game {
        uint gameId;
        string name;
        address creator;
        uint targetScore;
        uint stakemount;
        uint rollOutcome;
        bool bet;
        mapping(address => PlayerInfo) participants;
        address[] players;
        GameStatus status;
        uint currentPlayerIndex;
        address winner;
    }

    struct PlayerInfo {
        uint turnScore;
        uint totalScore;
        bool deposited;
    }
    
    mapping(uint => Game) internal  games;
    mapping(address => uint[]) internal createdGames;
    mapping(address => uint[]) internal participatedGames;
    
    event GameCreated(uint indexed gameId, address indexed creator);
    event PlayerJoined(uint indexed gameId, address indexed player);
    event PlayerRoll(uint indexed gameId, address indexed player, uint roll);
    event GameEnded(uint indexed gameId, address indexed winner);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    function createGame(string memory _name, uint _targetScore, uint _stakemount) public {
        gameId++;
        Game storage game = games[gameId];
        game.gameId = gameId;
        game.name = _name;
        game.creator = msg.sender;
        game.targetScore = _targetScore;
        game.stakemount = _stakemount;
        createdGames[msg.sender].push(gameId);
        emit GameCreated(gameId, msg.sender);
    }
    
    function joinGame(uint _gameId) public payable {
        require(_gameId <= gameId, "Invalid game id");
        Game storage game = games[_gameId];
        require(!isParticipant(_gameId, msg.sender), "You have already joined this game");
        require(game.status == GameStatus.New, "Can't join at the moment");
        require(msg.value == game.stakemount, "Incorrect stake amount");
        game.players.push(msg.sender); // used for player tracking.
        game.participants[msg.sender];
        participatedGames[msg.sender].push(_gameId);

        emit PlayerJoined(_gameId, msg.sender);
    }
    
    function rollDice(uint _gameId) public    {
        require(_gameId <= gameId, "Invalid game id");
        Game storage game = games[_gameId];
        require(game.players.length >= 2, "At least two players are required to start the game");
        require(!gameOver(game), "The game is over");

        if (game.status == GameStatus.New)  {
            game.status = GameStatus.InProgress;
        }
        
        uint roll = generateRandomNumber(); // Simulated roll of a six-sided die
        game.rollOutcome = roll;

        emit PlayerRoll(_gameId, msg.sender, roll);

        PlayerInfo storage participant = game.participants[msg.sender];
        
        if (roll == 1) {
            // End player's turn
            participant.turnScore = 0;
            setNextPlayerIndex(_gameId);
        } else {
            
            participant.turnScore += roll;

            if (participant.turnScore + participant.totalScore >= game.targetScore) {
                game.status = GameStatus.Ended;
                participant.totalScore += participant.turnScore;
                game.winner = msg.sender;
                emit GameEnded(_gameId, msg.sender);
            }

        }
    }
    
    function passTurn(uint _gameId) public  {
        Game storage game = games[_gameId];
        PlayerInfo storage participant = game.participants[msg.sender];
        participant.totalScore += participant.turnScore ;

        setNextPlayerIndex(_gameId);
    }
    

    
    function gameOver(Game storage game) private view returns (bool) {
        return game.status == GameStatus.Ended;
    }

    function transferToWinner(uint _gameId) internal {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Ended, "Game is not ended yet");
        address payable winner = payable(game.winner);
        uint prizeAmount = (game.stakemount * 90) / 100;

        // Transfer prize to the winner
        winner.transfer(prizeAmount);
    }

    function setNextPlayerIndex(uint _gameId) internal {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.InProgress, "Game not in progress");
        require(game.players.length > 0, "No players in the game");
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    }
    
    function generateRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 6 + 1;
    }

    function getGame(uint _gameId) public  view returns (
    uint id,
    string memory name,
    address creator,
    uint targetScore,
    uint stakemount,
    uint rollOutcome,
    bool bet,
    GameStatus status,
    uint currentPlayerIndex,
    address winner
    ) {
        // require(_gameId <= gameId, "Invalid game id");
        Game storage game = games[_gameId];

        return (
            game.gameId,
            game.name,
            game.creator,
            game.targetScore,
            game.stakemount,
            game.rollOutcome,
            game.bet,
            game.status,
            game.currentPlayerIndex,
            game.winner
        );
    }



    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function isParticipant(uint _gameId, address _player) internal view returns (bool) {
        Game storage game = games[_gameId];
        for (uint i = 0; i < game.players.length; i++) {
            if (game.players[i] == _player) {
                return true;
            }
        }
        return false;
    }

    function getGameId() view external returns(uint) {
        return gameId;
    }

}
