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
import {createPost, editPost} from '../services/api'

import ReactModal from 'react-modal'
import { func } from 'prop-types'


const initialValue = {
    titulo: '',
    conteudo: '',
    dataHora: '',
}
const SchedulePostForm = (props) => {
    
    
    let tempTitle, tempBody, tempDate = "";
    if(props.post != null)
    {
        tempTitle = props.post.title;
        tempBody = props.post.body;
        tempDate = props.post.publishDate;
    }
    
    const [Title, setTitle] = useState(tempTitle);
    const [Body, setBody] = useState(tempBody);
    const [postDateTime, setPostDateTime] = useState(tempDate)

    let inputProps
    if(props.isEdit){
        inputProps = {
            disabled: true,
            value: moment(postDateTime).format('DD/MM/YYYY hh:mm:ss')
        };
    }else{
        inputProps = {
            placeholder: new Date(),
            disabled: false,
            value: moment(new Date()).format('DD/MM/YYYY hh:mm:ss')
            
        };
    }
    

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function makeRequest()
    {
        console.log("makeRequest")
        
        console.log(Title)
        console.log(Body)
        console.log(postDateTime)
        if(!props.isEdit){
            createPost(Title, Body, postDateTime);
        }else{
            editPost(props.post.id, Title, Body, moment(postDateTime));
        }
        
    }

    function onChangePostDateTime()
    {
        alert("onChangePostDateTime 1");
        //(e) => setPostDateTime(e.target.value)
    }

   
    
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
                            onChange={(e) => setTitle(e.target.value)}
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
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </Box>
                </Flex>
                <Flex mx={-2} mb={3}>
                    <Box width={1/4} px={2}>
                    {postActionMode == "postar-futuro" &&        
                        <>
                            <LabelForm htmlFor='publishDate'>Data e hora</LabelForm>
                            <Datetime onChange={setPostDateTime} inputProps={ inputProps } />
                        </>
                    }                    
                    </Box>
                    
                    <Box width={1/2} px={2} mt='auto'>
                        {!props.isEdit &&        
                            <PostAction postActionModeCallback={postActionModeCallback}/>
                        }
                        {props.isEdit &&        
                            <>
                                <Datetime inputProps={ inputProps } value={postDateTime} />
                                <div><button className='btn'>Editar</button></div>
                            </>
                        
                        }
                    </Box>
                    
                </Flex>
                <button onClick={openModal}>Open Modal</button> 
                <button onClick={makeRequest}>Make Request</button> 
            </Box>
            <ReactModal

        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}    
        contentLabel="Example Modal">
            <div><h1>Olá</h1><button onClick={closeModal}>close</button></div>
            </ReactModal>
        </Container>
    );
};

export default SchedulePostForm;