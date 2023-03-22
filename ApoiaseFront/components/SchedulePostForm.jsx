import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Box, Flex, Button } from 'rebass/styled-components';
import ReactModal from 'react-modal';
import Router from 'next/router';
import { Container, LabelForm, InputForm, TextareaForm, Title, P1 } from './style/sharedstyles';
import PostAction from './PostAction';
import { createPost, editPost } from '../services/api';

async function makeRequest(req) {
  if (!req.isEdit) {
    if (req.publishDate.diff(moment(), 'minutes') >= 5 || req.actionMode === 'post-now') {
      try {
        let date = moment(req.publishDate).format();
        date = (req.actionMode === 'post-now') ? (moment().format()) : (date);
        const createPostResult = await createPost(req.title, req.body, date, req.actionMode);
        if (createPostResult.data.id != null) {
          req.setModalMessage(
            <>
              <Title>Sua postagem foi cadastrada</Title>
              <P1>Obrigado</P1>
            </>,
          );
        } else {
          req.setModalMessage(
            <>
              <Title>Não foi possível agendar sua postagem</Title>
              <P1>Não é possível agendar mais de 3 postagens</P1>
            </>,
          );
        }
        req.resetPost();
      } catch (error) {
        alert(error);
      }
    } else {
      req.setModalMessage(
        <>
          <Title>Não foi possível agendar sua postagem</Title>
          <P1>Por favor, selecione um horário pelo menos 5 minutos no futuro</P1>
        </>,
      );
      req.openModal();
    }
    req.openModal();
  } else {
    let date = moment(req.publishDate).format();
    date = (req.actionMode === 'post-now') ? (moment().format()) : (date);
    await editPost(req.postId, req.title, req.body, date);
    Router.push('/');
  }
}

function SchedulePostForm(props) {
  let tempTitle; let tempBody;
  let tempDate = moment();

  if (props.post != null) {
    tempTitle = props.post.title;
    tempBody = props.post.body;
    tempDate = moment(props.post.publishDate);
  }

  const [Title, setTitle] = useState(tempTitle);
  const [Body, setBody] = useState(tempBody);
  const [postDateTime, setPostDateTime] = useState(tempDate);
  const [modalMessage, setModalMessage] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postActionMode, setPostActionMode] = useState('post-now');

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

  function openModal() {
    setIsOpen(true);
  }

  function checkIfIsPastDate() {
    return (postDateTime.diff(moment(), 'minutes') < 5);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function doPostAction() {
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
  return (
    <Container>
      <Box
        as="form"
        onSubmit={(e) => e.preventDefault()}
        py={3}
        px={[1, 3, 6]}
      >
        <Flex mx={-2} mb={3}>
          <Box width={1} px={2}>
            <LabelForm htmlFor="title">Título da postagem*</LabelForm>
            <InputForm
              type="text"
              id="title"
              name="title"
              placeholder="Título"
              required
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        </Flex>
        <Flex mx={-2} mb={3}>
          <Box width={1} px={2}>
            <LabelForm htmlFor="body">Conteúdo*</LabelForm>
            <TextareaForm
              id="body"
              name="body"
              placeholder="Conteúdo"
              required
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
            flexDirection: ['column', 'row', 'row'],
          }}
        >
          <Box width={[1, 0.5, 0.25]} px={2}>
            {(postActionMode === 'post-future' || props.isEdit)
                && (
                <>
                  <LabelForm htmlFor="publishDate">Data e hora</LabelForm>
                  <Datetime
                    onChange={setPostDateTime}
                    inputProps={inputProps}
                    value={postDateTime}
                  />
                </>
                )}
          </Box>

          <Box width={[1, 0.75, 0.5]} px={2} mt="11px">
            <PostAction
              postActionMethod={doPostAction}
              isEdit={props.isEdit}
              isPastDate={checkIfIsPastDate()}
              postActionModeCallback={postActionModeCallback}
            />
          </Box>

        </Flex>
      </Box>
      <ReactModal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          {modalMessage}
          <Button
            sx={{
              marginTop: '2rem',
              backgroundColor: '#00d062',
            }}
            onClick={closeModal}
          >
                Fechar
          </Button>
        </div>
      </ReactModal>
    </Container>
  );
}

export default SchedulePostForm;
