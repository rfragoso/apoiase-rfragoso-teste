import React, {useState} from 'react';
import {Box, Button, Flex  } from 'rebass/styled-components';
import { Select } from '@rebass/forms'

const PostAction = (postActionModeCallback) => {
    const [buttonMessage, setbuttonMessage] = useState("Postar agora");
    const [currentAction, setCurrentAction]  = useState("postar-agora");
    function handleModeChange(value)
    {
        if(value == "postar-agora")
        {
            setbuttonMessage("Postar Agora")
            setCurrentAction(value);
            postActionModeCallback.postActionModeCallback(value);
        }
        if(value == "postar-futuro")
        {
            setbuttonMessage("Agendar Postagem")
            setCurrentAction(value);
            postActionModeCallback.postActionModeCallback(value);
        }
    }

    function handleClick(e)
    {
        //alert(currentAction);
    }
    
    return(
        <Flex>
            <Box width={1/2}>
                <Select 
                    sx={{
                        color: '#555555',
                        fontFamily: 'ubuntu',
                        backgroundColor: '#fcfcfc',
                        border: 'none'
                    }}
                    id='modoPostagem'
                    name='modoPostagem'
                    defaultValue='Postar Agora'
                    onChange={(e) => handleModeChange(e.target.value)}
                >

                <option value="postar-agora"
                    key={"postar-agora"} >
                    Postar Agora
                </option>

                <option value="postar-futuro"
                    key={"postar-futuro"} >
                    Agendar Postagem
                </option>
            
                </Select>
            </Box>
            <Box width={1/2}>
                <Button 
                    onClick={(e) => handleClick(e)}
                    sx={{
                        display: 'block',
                        width: '100%',
                        backgroundColor: '#00d062'
                    }}
                >
                    {buttonMessage}
                </Button>
            </Box>
        </Flex>
    );
};

export default PostAction;