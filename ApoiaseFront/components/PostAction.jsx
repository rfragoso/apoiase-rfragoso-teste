import React, { useState } from 'react';
import { Box, Button, Flex } from 'rebass/styled-components';
import { Select } from '@rebass/forms';

function PostAction({
  postActionModeCallback, postActionMethod, isPastDate, isEdit,
}) {
  const [buttonMessage, setbuttonMessage] = useState(
    isPastDate ? 'Postar Agora' : 'Agendar Postagem',
  );
  const [currentAction, setCurrentAction] = useState(
    isPastDate ? 'post-now' : 'post-future',
  );
  function handleModeChange(value) {
    if (value === 'post-now') {
      setbuttonMessage('Postar Agora');
      setCurrentAction(value);
      postActionModeCallback(value);
    }
    if (value === 'post-future') {
      setbuttonMessage('Agendar Postagem');
      setCurrentAction(value);
      postActionModeCallback(value);
    }
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
          defaultValue={currentAction}
          onChange={(e) => handleModeChange(e.target.value)}
        >

          <option
            value="post-now"
            key="post-now"
          >
            Postar Agora
          </option>

          <option
            value="post-future"
            key="post-future"
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
