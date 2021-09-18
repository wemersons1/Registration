import React, {useContext} from 'react';
import styles from './HeaderButtonPage.module.css';
import {Link, useHistory} from "react-router-dom";
import Button from "../Button";
import {RiAddCircleLine, RiArrowGoBackLine} from 'react-icons/ri';
import Context from "../../Hooks/Context";
import {Row, Col}  from 'react-bootstrap';

const HeaderButtonPage = ({type, to, title, h1, h2}) => {

    const {user} = useContext(Context);

    const history = useHistory();

    if(type === 'store') {
        return (

            <div className={styles.HeaderButtonPage}>
                {
                    user.role.name !== 'Investidor' &&
                  <Row>
                      <Col md={9}>
                          <h1>{h1}</h1>
                      </Col>
                      <Col md={3}>
                          <Link to={to}>
                              <Button>{title}<RiAddCircleLine className={styles.Icon}/></Button>
                          </Link>
                      </Col>
                  </Row>
                }
            </div>

        );
    }

    return (
        <div className={styles.HeaderButtonPage}>
            <Row>
                <Col className={styles.Centralize} md={2}>
                    <button className={styles.Back} onClick={e => history.goBack()}>
                        <RiArrowGoBackLine className={styles.Icon}/>
                    </button>
                </Col>
                <Col md={9}>
                    <h2>{h2}</h2>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderButtonPage;
