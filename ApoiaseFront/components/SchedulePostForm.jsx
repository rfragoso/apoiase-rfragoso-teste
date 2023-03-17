import React, {useState} from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'moment/locale/pt-br';
/*import axios from 'axios';*/
import {Container, LabelForm, InputForm, TextareaForm} from '../components/style/sharedstyles';
import {Label, Input, Select, Textarea, Radio, Checkbox, } from '@rebass/forms';
import {Box, Flex, Heading, Text, Button, Image, Card, } from 'rebass/styled-components';
import Datepicker from './Datepicker';
import PostAction from './PostAction';

const initialValue = {
    titulo: '',
    conteudo: '',
    dataHora: '',
}
const SchedulePostForm = (props) => {
    alert("props.post:" + props.post.title);
    const [postDateTime, setPostDateTime] = useState(props.value)

    const [Title, setTitle] = useState(props.post.title);
    const [Body, setBody] = useState();
    
    /*if(props.post != null)
    {
        setTitle(props.post.title);
        setBody(props.post.body);
    }
    */
    //alert("state:" + postDateTime);
    
    const [postActionMode, setPostActionMode] = useState("postar-agora");
    
    function postActionModeCallback(value){
        //alert("Externo: " + value)
        setPostActionMode(value);       
    }  

    return(
        <Container>
            <Box
                as='form'
                onSubmit={e => e.preventDefault()}
                py={3}
                px={6}>
                <Flex mx={-2} mb={3}>
                    <Box width={1} px={2}>
                        <LabelForm htmlFor='title'>Título da postagem</LabelForm>
                        <InputForm
                            type='text'
                            id='title'
                            name='title'
                            placeholder='Título'
                            value={Title}
                        />
                    </Box>
                </Flex>
                <Flex mx={-2} mb={3}>
                    <Box width={1} px={2}>
                        <LabelForm htmlFor='body'>Conteúdo</LabelForm>
                        <TextareaForm
                            id='body'
                            name='body'
                            placeholder='Conteúdo'
                            value={Body}
                        />
                    </Box>
                </Flex>
                <Flex mx={-2} mb={3}>
                    <Box width={1/4} px={2}>
                    {postActionMode == "postar-futuro" &&        
                        <>
                            <LabelForm htmlFor='publishDate'>Data e hora</LabelForm>
                            <Datepicker readonly={props.isDateReadOnly} value={postDateTime} />
                        </>
                    }                    
                    </Box>
                    
                    <Box width={1/4} px={2} mt='auto'>
                        {!props.isEdit &&        
                        <PostAction postActionModeCallback={postActionModeCallback}/>
                        }
                        {props.isEdit &&        
                        <>
                        <Datepicker readonly={props.isDateReadOnly} value={postDateTime}/>
                        <div>update</div>
                        </>
                        
                        }
                    </Box>
                    
                </Flex>
                
            </Box>
        </Container>
    );
};

export default SchedulePostForm;