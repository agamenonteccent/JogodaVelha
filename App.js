import React, { useState } from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import Board from './components/Board';
import { mainApp } from './styles/styles'

export default function App() {

 
  const [playerTurn, changeTurn] = useState(true);
  const [end, endGame] = useState(false);
  const [modal, toggleModal] = useState(false);


  const [result, setResult] = useState('');


  const [turns, setTurn] = useState({});

  const togglePlayer = () => changeTurn(!playerTurn);
  const toggleGame = () => endGame(!end);
  const triggerModal = () => toggleModal(!modal)

  const newGame = () => {
    setTurn({});
    endGame(false);
    toggleModal(false);
    changeTurn(true);
    setResult('');
  };

  const finishGame = () => {
    endGame(true);
    triggerModal();
  };

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (turns[a] === turns[b] && turns[b] === turns[c] && a in turns && b in turns && c in turns) {
        setResult(playerTurn ? 'Parabéns jogador 1!' : 'Parabéns jogador 2!');
        finishGame();
      }
    }

    if (Object.keys(turns).length === 9) {
      setResult('Empate!');
      finishGame();
    }
  }

  function checkTurn(value) {
    const tempTurns = turns;
    tempTurns[value] = playerTurn ? 'X' : 'O';

    //Sets the turn state with the new value added
    setTurn({ ...tempTurns });

    checkWinner();
    togglePlayer();
  }

  return (
    <View style={mainApp.container}>
      {!end && (
        <Board
          turns={turns}
          checkTurn={checkTurn}
        />
      )}
      <Modal animationType={'slide'} visible={modal}>
        <View style={mainApp.centeredView}>
          <View style={mainApp.modalView}>
            <Text style={mainApp.h2}>{result}</Text>
            <TouchableOpacity style={mainApp.purpleButton} onPress={newGame}>
              <Text style={mainApp.whiteButtonText}>Começar um novo jogo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={mainApp.legend}>
        <Text style={mainApp.subheader}>X - Jogador 1</Text>
        <Text style={mainApp.subheader}>O - Jogador 2</Text>
      </View>
    </View>
  );
}
