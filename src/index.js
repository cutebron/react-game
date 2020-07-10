import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//每一個方格樣子
function  Square(props) {
    return (
      <button
        className="square"
        onClick={props.onClick}>
          {props.value}
      </button>
    );
}

//判斷輸贏
 function whowin(squares){
      const wins=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i=0;i<wins.length;i++){
          const [a,b,c]=wins[i];
          if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
            return squares[a];
          }
      }
      return null
 }

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state={
      squares:Array(9).fill(null),
      xIsNext: true,
      }
    }

    playerClick(i){
            const squares=this.state.squares.slice();
            const winner=whowin(squares);
            if(winner||squares[i]){
              return
            }else{
                  squares[i]=this.state.xIsNext?'X':' O';
                  this.setState({
                  squares:squares,
                  xIsNext:! this.state.xIsNext
                })
            }
     }

     // 渲染格子
    renderSquare(i) {
      return <Square
          value={this.state.squares[i]}
          onClick={()=>{this.playerClick(i)}}
          />;
    }

    render() {
            const winner=whowin(this.state.squares);
            let status;
            if(winner){
              status='獲得勝利的是:'+winner;
            }else{
              status = '下一位玩家: '+(this.state.xIsNext?'X':' O');
            }
            return (
              <div>
                <div className="status"><h2>{status}</h2></div>
                <div className="board-row">
                  {this.renderSquare(0)}
                  {this.renderSquare(1)}
                  {this.renderSquare(2)}
                </div>
                <div className="board-row">
                  {this.renderSquare(3)}
                  {this.renderSquare(4)}
                  {this.renderSquare(5)}
                </div>
                <div className="board-row">
                  {this.renderSquare(6)}
                  {this.renderSquare(7)}
                  {this.renderSquare(8)}
                </div>
              </div>
            );
          }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
