import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Box, Flex } from 'rebass/styled-components';
import ReactModal from 'react-modal';
import Router from 'next/router';
import {
  Container, LabelForm, InputForm, TextareaForm,
} from './style/sharedstyles';
import PostAction from './PostAction';
import { createPost, editPost } from '../services/api';

async function makeRequest(req) {
  if (!req.isEdit) {
    if (req.publishDate.diff(moment(), 'minutes') >= 5 || req.actionMode === 'postar-agora') {
      try {
        let date = moment(req.publishDate).format();
        date = (req.actionMode == 'postar-agora') ? (moment().format()) : (date);
        const createPostResult = await createPost(req.title, req.body, date, req.actionMode);
        if (createPostResult.data.id != null) {
          req.setModalMessage(
            <>
              <h1>Sua postagem foi cadastrada</h1>
              <p>Obrigado</p>
            </>,
          );
        } else {
          req.setModalMessage(
            <>
              <h1>Não foi possível agenda sua postagem</h1>
              <p>Não é possível agendar mais de 3 postagens</p>
            </>,
          );
        }
        req.resetPost();
      } catch (error) {
        alert(error);
      }
    } else {
      req.setModalMessage(<>
        <h1>Não foi possível agenda sua postagem</h1>
        <p>Por favor, selecione um horário pelo menos 5 minutos no futuro</p>
      </>);
      req.openModal();
    }
    req.openModal();
  } else {
    let date = moment(req.publishDate).format();
    date = (req.actionMode == 'postar-agora') ? (moment().format()) : (date);
    await editPost(req.postId, req.title, req.body, date);
    Router.push('/');
  }
}

function SchedulePostForm(props) {
  let tempTitle; let
    tempBody = '';
  let tempDate = moment();

  if (props.post != null) {
    tempTitle = props.post.title;
    tempBody = props.post.body;
    tempDate = moment(props.post.publishDate);
  }

  const [Title, setTitle] = useState(tempTitle);
  const [Body, setBody] = useState(tempBody);
  const [modalMessage, setModalMessage] = useState();
  const [postDateTime, setPostDateTime] = useState(tempDate);

  let inputProps;
  if (props.isEdit) {
    inputProps = {
      disabled: checkIfIsPastDate(),
    };
  } else {
    inputProps = {
      disabled: false,
      className: 'inputDatetime',
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
    // subtitle.style.color = '#f00';
  }

  function checkIfIsPastDate() {
    return (postDateTime.diff(moment(), 'minutes') < 5);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onChangePostDateTime(e) {
    console.log(`onChangePostDateTime: ${e}`);
    setPostDateTime(e);
  }

  const [postActionMode, setPostActionMode] = useState('postar-agora');

  function doPostAction() {
    console.log('doPostAction');
    makeRequest(req());
  }

  function postActionModeCallback(value) {
    setPostActionMode(value);
  }
  const resetPost = () => {
    setTitle('');
    setBody('');
    setPostDateTime(moment());
  };
  function req() {
    return ({
      postId: (props.post != null) ? (props.post.id) : (0),
      title: Title,
      body: Body,
      publishDate: postDateTime,
      isEdit: props.isEdit,
      actionMode: postActionMode,
      resetPost,
      openModal,
      setModalMessage,
    });
  }
  // console.log("req - off: " + req);
  return (
    <Container>
      <Box
        as="form"
        onSubmit={(e) => e.preventDefault()}
        py={3}
        px={6}
      >
        <Flex mx={-2} mb={3}>
          <Box width={1} px={2}>
            <LabelForm htmlFor="title">Título da postagem</LabelForm>
            <InputForm
              type="text"
              id="title"
              name="title"
              placeholder="Título"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        </Flex>
        <Flex mx={-2} mb={3}>
          <Box width={1} px={2}>
            <LabelForm htmlFor="body">Conteúdo</LabelForm>
            <TextareaForm
              id="body"
              name="body"
              placeholder="Conteúdo"
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
          <Box width={1 / 4} px={2}>
            {(postActionMode == 'postar-futuro' || props.isEdit)
                        && (
                        <>
                          <LabelForm htmlFor="publishDate">Data e hora</LabelForm>
                          <Datetime onChange={setPostDateTime} inputProps={inputProps} value={postDateTime} />
                        </>
                        )}
          </Box>

          <Box width={1 / 2} px={2} mt="11px">
            <PostAction postActionMethod={doPostAction} isEdit={props.isEdit} isPastDate={checkIfIsPastDate()} postActionModeCallback={postActionModeCallback} />
          </Box>

        </Flex>
      </Box>
      <ReactModal

        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          {modalMessage}
          <button onClick={closeModal}>close</button>
        </div>
      </ReactModal>
    </Container>
  );
}

export default SchedulePostForm;
