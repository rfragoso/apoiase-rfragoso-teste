import React, {useState} from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'moment/locale/pt-br';
/*import axios from 'axios';*/
import {Container, LabelForm, InputForm, TextareaForm} from '../components/style/sharedstyles';
import {Label, Input, Select, Textarea, Radio, Checkbox, } from '@rebass/forms';
import {Box, Flex, Heading, Text, Button, Image, Card, } from 'rebass/styled-components';
import Datepicker from './Datepicker';

const initialValue = {
    titulo: '',
    conteudo: '',
    dataHora: '',
}
const SchedulePostForm = () => {
    const [values, setValues] = useState(initialValue);

    function onChange(ev) {
        const { name, value } = ev.target;

        console.log({name, value})
    }

    function onSubmit(ev){
        ev.preventDefault();

        /*axios.post('url', values)
        .then((response) =>{

        });*/
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
                            onChange={onChange}
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
                            onChange={onChange}
                        />
                    </Box>
                </Flex>
                <Flex mx={-2} mb={3}>
                    <Box width={1/4} px={2}>
                        <LabelForm htmlFor='publishDate'>Data e hora</LabelForm>
                        <Datepicker />
                    </Box>
                    <Box width={1/4} px={2} mt='auto'>
                        <Button type="submit">
                            Agendar post
                        </Button>
                    </Box>
                    
                </Flex>
                
            </Box>
        </Container>
    );
};

export default SchedulePostForm;