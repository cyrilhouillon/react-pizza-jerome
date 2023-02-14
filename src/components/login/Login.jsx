
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuthContext } from "../../context/AuthContext";
// import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../constant";
import { setToken } from "../helpers";
import { setRole } from "../helpers";
import "../login/login.css";

// const getRoleLog  = (ctx, next) {

//   const { id } = ctx.params;

//   return await strapi.query("plugin::users-permissions.user").findOne({

//     where: { id },

//     populate: ["role"],

//   });

// }

const Login = () => {
  const [form] = Form.useForm();
  // const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
        message.success(`Welcome back ${data.user.username}!`);

        console.log(data)

        const token = data.jwt;
        const idUser = data.user.id;
        // console.log(idUser)

        const responseRole = axios.get(`${API}/users/me?populate=*`,{
          headers: {
            Authorization: `Bearer ${token}`,//  when user login there will be a jwt in reponse so you can pass user jwt in here 
          }
        });

        const dataRole = await responseRole;
        setRole(dataRole.data.role.name)
        console.log(dataRole)
        console.log(dataRole.data.role.name)
        if (dataRole?.error) {
          throw data?.error
        }else if (dataRole.data.role.name == "administrateur"){
          document.location.href="/reservation";  
        }
         else if(dataRole.data.role.name == "Authenticated"){
          document.location.href="/pizzas";  
        } else {
          console.log(dataRole)
        }
      }
    } catch (error) {
      console.log(error)
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Fragment>
        <Card title="Connexion">
          <Alert
            className="alert_error"
            message={error}
            type="error"
            afterClose={() => setError("")}
            style={{ display: "block", justifyContent: "center", alignItems: "center" }}
          /> 
          <Form
             layout="inline"  
              form={form}
              className="form-connexion"
              name="basic"
              // layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
          >
            <Form.Item
                label="Email"
                name="email"
                className="input-connexion"
            >
              <Input placeholder="Email address" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                className="input-password"
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
                  className="button-connexion"
              >
                Login {isLoading && <Spin size="small" />}
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph className="form_help_text">
            Pas de compte ? <Link to="/inscription">inscription</Link>
          </Typography.Paragraph>
          <Typography.Paragraph className="form_help_text">
            {/* <Link to="/">Mot de passe oublié ? </Link> */}
          </Typography.Paragraph>
        </Card>
      </Fragment>
  );
};

export default Login;