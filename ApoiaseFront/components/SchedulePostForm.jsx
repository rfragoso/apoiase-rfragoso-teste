import React, {useState} from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import 'moment/locale/pt-br';
import {Container, LabelForm, InputForm, TextareaForm} from '../components/style/sharedstyles';
import {Box, Flex } from 'rebass/styled-components';
import PostAction from './PostAction';
import {createPost, editPost} from '../services/api'
import ReactModal from 'react-modal'
import Router from 'next/router'

async function makeRequest(req)
    {
        console.log("makeRequest")
        console.log("req - on: " + req);
        //alert(postDateTime.diff(moment(), 'minutes'))
        if(!req.isEdit){
            if(req.publishDate.diff(moment(), 'minutes') >= 5){
                try{
                    console.log("************")
                    console.log("req.postDateTime: " + req.publishDate);
                    console.log("************")
                    console.log("actionMode: " + req.actionMode)
                    await createPost(req.title, req.body, moment(req.publishDate).format(), req.actionMode);
                    req.resetPost();
                }catch(error){
                    alert(error)
                }
                
            }else{
                //openModal()
            }            
        }else{
            
            await editPost(req.postId, req.title, req.body, moment(req.publishDate).format());
            Router.push('/');
        }
        
    }


const SchedulePostForm = (props) => {
    
    
    let tempTitle, tempBody = "";
    let tempDate = moment();
    
    if(props.post != null)
    {
        tempTitle = props.post.title;
        tempBody = props.post.body;
        tempDate = moment(props.post.publishDate);
    }
    
    const [Title, setTitle] = useState(tempTitle);
    const [Body, setBody] = useState(tempBody);
    const [postDateTime, setPostDateTime] = useState(tempDate);


    let inputProps;
    if(props.isEdit){
        inputProps = {
            disabled: (postDateTime.diff(moment(), 'minutes') < 5),
           
        };
    }else{
        inputProps = {
            disabled: false,
            className: 'inputDatetime'
           
        };
    }
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          borderRadius: '20px',
          padding: '5rem',
        },
      };
    

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

    

    function onChangePostDateTime(e) 
    {
        console.log("onChangePostDateTime: " + e)
        setPostDateTime(e)
    }
    

   
    
    const [postActionMode, setPostActionMode] = useState("postar-agora");
    
    function postActionModeCallback(value){
        setPostActionMode(value);       
    }  
    const resetPost = () =>{
        setTitle("");
        setBody("");
        setPostDateTime(moment());
    };
    let req = 
    {
        postId: (props.post != null) ? (props.post.id) : (0),
        title: Title,
        body: Body,
        publishDate: postDateTime,
        isEdit: props.isEdit,
        actionMode: postActionMode,
        resetPost: resetPost
    }
    //console.log("req - off: " + req);
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
                <Flex 
                    mx={-2} 
                    mb={3}
                    sx={{
                        justifyContent: 'end',
                    }}
                >
                    <Box width={1/4} px={2}>
                    {postActionMode == "postar-futuro" &&       
                        <>
                            <LabelForm htmlFor='publishDate'>Data e hora</LabelForm>
                            <Datetime onChange={setPostDateTime} inputProps={ inputProps } value={postDateTime} />
                        </>
                    }                    
                    </Box>
                    
                    <Box width={1/2} px={2} mt='11px'>
                        {!props.isEdit &&        
                            <PostAction postActionModeCallback={postActionModeCallback}/>
                        }
                        {props.isEdit &&        
                            <>
                                <Datetime onChange={setPostDateTime} inputProps={ inputProps } value={postDateTime} />
                                <div><button className='btn'>Editar</button></div>
                            </>
                        
                        }
                    </Box>
                    
                </Flex>
                <button onClick={openModal}>Open Modal</button> 
                <button onClick={() => {makeRequest(req)}}>Make Request</button> 
            </Box>
            <ReactModal

                isOpen={modalIsOpen}
                style={customStyles}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}    
                contentLabel="Example Modal">
                <div>
                    <h1>Não foi possível agenda sua postagem</h1>
                    <p>Por favor, selecione um horário pelo menos 5 minutos no futuro</p>
                    <button onClick={closeModal}>close</button></div>
            </ReactModal>
        </Container>
    );
};

export default SchedulePostForm;