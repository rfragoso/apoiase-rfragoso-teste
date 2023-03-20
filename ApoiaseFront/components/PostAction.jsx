import React, { useState } from 'react';
import { Box, Button, Flex } from 'rebass/styled-components';
import { Select } from '@rebass/forms';

function PostAction({
  postActionModeCallback, postActionMethod, isPastDate, isEdit,
}) {
  const [buttonMessage, setbuttonMessage] = useState('Postar agora');
  const [currentAction, setCurrentAction] = useState('postar-agora');
  function handleModeChange(value) {
    if (value === 'postar-agora') {
      setbuttonMessage('Postar Agora');
      setCurrentAction(value);
      postActionModeCallback(value);
    }
    if (value === 'postar-futuro') {
      setbuttonMessage('Agendar Postagem');
      setCurrentAction(value);
      postActionModeCallback(value);
    }
  }

  function handleClick(e) {

    // alert(currentAction);
  }

  const DropDownListButton = (
    <Flex>
      <Box width={1 / 2}>
        <Select
          sx={{
            color: '#555555',
            fontFamily: 'ubuntu',
            backgroundColor: '#fcfcfc',
            border: 'none',
          }}
          id="modoPostagem"
          name="modoPostagem"
          defaultValue="Postar Agora"
          onChange={(e) => handleModeChange(e.target.value)}
        >

          <option
            value="postar-agora"
            key="postar-agora"
          >
            Postar Agora
          </option>

          <option
            value="postar-futuro"
            key="postar-futuro"
          >
            Agendar Postagem
          </option>

        </Select>
      </Box>
      <Box width={1 / 2}>
        <Button
          onClick={() => postActionMethod()}
          sx={{
            display: 'block',
            width: '100%',
            backgroundColor: '#00d062',
          }}
        >
          {buttonMessage}
        </Button>
      </Box>
    </Flex>
  );

  const UpdateButton = (
    <Button
      onClick={() => postActionMethod()}
      sx={{
        display: 'block',
        width: '100%',
        backgroundColor: '#00d062',
      }}
    >
      Atualizar
    </Button>
  );

  return (
    <>
      {((isEdit && isPastDate)
            && UpdateButton
        )}

      {((isEdit && !isPastDate)
            && DropDownListButton
        )}

      {((!isEdit)
            && DropDownListButton
        )}
    </>
  );
}

export default PostAction;
