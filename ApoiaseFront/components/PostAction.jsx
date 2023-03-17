import React, {useState} from 'react';
import {Box, Button,  } from 'rebass/styled-components';
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
        alert(currentAction);
    }
    
    return(

        <Box px={2} mt='auto'>
            <Button onClick={(e) => handleClick(e)}>
                {buttonMessage}
            </Button>
            <Select onChange={(e) => handleModeChange(e.target.value)}
                id='modoPostagem'
                name='modoPostagem'
                defaultValue='Postar Agora'>

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

);
};

export default PostAction;