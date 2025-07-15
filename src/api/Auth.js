import client from '../axios/Client';


export  const SignupUser = async (values) => {
    const res = await client.post('/users/signup', values);
    return res.data;
  };


  export  const LoginUser = async (values) => {
    const res = await client.post('/users/login', values);
    return res.data
  };

    export  const getUser = async () => {
    const res = await client.get('/users/getUser');
    return res.data.user;
  };