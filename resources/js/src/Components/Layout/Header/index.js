import React, {useContext, useState, useEffect} from 'react';
import styles from './Header.module.css';
import {MdAccountCircle} from 'react-icons/md';
import {FiLogOut} from 'react-icons/fi';
import {RiLockPasswordLine} from 'react-icons/ri';
import {BsInfoCircle, BsEye, BsEyeSlash} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {BiLoader} from 'react-icons/bi';
import Context from "../../../Hooks/Context";
import {Link} from 'react-router-dom';

const Header = () => {

    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState({});

    const {signOut, token, user} = useContext(Context);

    useEffect(() => {
        if(token) {
            axios.get('/api/v1/notifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setNotifications(response.data);
            }).finally(() => {
                setLoading(false);
            })
        }

    }, [token]);

    useEffect(() => {

        if(showNotifications) {
            setLoading(true);
            axios.get('/api/v1/notifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setNotifications(response.data);

            }).finally(() => {
                setLoading(false);
            });
        }

    }, [showNotifications]);

    const logout = () => {
        signOut();
    }

    const setShowNotificationsChange = e => {
        setShowNotifications(!showNotifications);
        setShowMenu(false);
    }

    const setShowMenuChange = e => {
        setShowMenu(!showMenu);
        setShowNotifications(false);
    }

    const readMessage = (notification, index) => {
        let notificationsDecrement = {...notifications, ['quantity']: notifications.quantity-1}
        let notificationsTreated = [...notificationsDecrement['notifications']];
        notificationsTreated[index] = {...notificationsTreated[index], ['is_read']: true };
        setNotifications({...notificationsDecrement, ['notifications']:notificationsTreated});

        let data = {
            is_read: true
        };

        axios.put(`/api/v1/notifications/${notification.id}`, data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }

    const unReadMessage = (id, index) => {
        let notificationsDecrement = {...notifications, ['quantity']: notifications.quantity+1}
        let notificationsTreated = [...notificationsDecrement['notifications']];
        notificationsTreated[index] = {...notificationsTreated[index], ['is_read']: false };
        setNotifications({...notificationsDecrement, ['notifications']:notificationsTreated});

        let data = {
            is_read: false
        };

        axios.put(`/api/v1/notifications/${id}`, data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const setReadNotificationsChange = (notification, index) => {
        setShowNotifications(false);
        readMessage(notification, index);
    }

    return (
        <header className={styles.Header}>
          <div className={styles.ContentMenu}>
              <div>
                  <button onClick={setShowNotificationsChange}>
                      {notifications.quantity ? <span>{notifications.quantity}</span> : null}
                      <IoMdNotificationsOutline/>
                  </button>

                  {
                      showNotifications &&
                      <ul className={styles.Notification}>
                          {
                              loading ? <BiLoader/> :
                                  notifications.notifications.map((notification, index) => {
                                      return (
                                          <div key={index}>
                                              <li onClick={e => setShowMenu(false)}>
                                                  <Link
                                                      onClick={e => setReadNotificationsChange(notification, index)}
                                                      to={`/admin/students/${notification.document.student.id}`}
                                                  >
                                                      <h6>
                                                          {
                                                              notification.document.model.type.id === 1 ?
                                                                  'Certificado' : 'Autorização'
                                                          }
                                                      </h6>
                                                      <p>{notification.document.student.name}</p>
                                                      <p>
                                                          {notification.document.course.name.toUpperCase()} - {notification.document.date_end_validate.split(' ')[0]}
                                                      </p>
                                                  </Link>
                                                  <div>

                                                      {
                                                          !notification.is_read ?
                                                              <BsEye onClick={e => readMessage(notification, index)}/> :
                                                              <BsEyeSlash  onClick={e => unReadMessage(notification.id, index)}/>
                                                      }

                                                  </div>
                                              </li>
                                          </div>
                                      );
                                  })

                          }
                          <p className={styles.ShowAll}><Link to={'/admin/notifications'} onClick={e => setShowNotifications(false)}>Ver todas</Link></p>
                      </ul>
                  }
              </div>
              <div>
                  <button
                      onClick={setShowMenuChange}
                  ><MdAccountCircle/></button>
                  {
                      showMenu &&
                      <ul>
                          <li onClick={e => setShowMenu(false)}>
                              <Link to={`/${user.role.name === 'Administrador' ? 'admin' : user.role.name === 'Consultor' ? 'consultant' : 'investor'}/my-account`}><BsInfoCircle className={'icon-left'}/>Minha conta</Link>
                          </li>
                          <li onClick={e => setShowMenu(false)}>
                              <Link to={'/admin/reset-password'}>
                                  <RiLockPasswordLine className={'icon-left'}/>Redefinir senha
                              </Link>
                          </li>
                          <li onClick={e => setShowMenu(false)}>
                              <Link to={'/login'} onClick={logout}>
                                  <FiLogOut className={'icon-left'} />Sair
                              </Link>
                          </li>
                      </ul>
                  }
              </div>

          </div>
        </header>
    );
}

export default Header;
