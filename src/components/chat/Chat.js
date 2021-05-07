import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { ContactsContext } from '../../context/ContactsContext';
import { types } from '../../context/contactsTypes';

import { scrollToBottomAnimated } from '../../helpers/scrollToBottom';
import { Messages } from './Messages';
import { format } from 'date-fns';
import { EPCompanies, EPMessages } from '../../API/api';
import { useToasts } from 'react-toast-notifications';

export const Chat = () => {
 const [message, setMessage] = useState('');
 const { contactsState, dispatch } = useContext(ContactsContext);
 const { activeContact, activeTeam } = contactsState;
 const history = useHistory();
 const { addToast } = useToasts();

 useEffect(() => {
  if (activeContact === null) {
   history.push('/auth/login');
  }
 });

 const onChange = ({ target }) => {
  setMessage(target.value);
 };

 const dispatchFiles = (files) => {
  files.forEach((file) => {
   if (activeTeam.name === 'contacts') {
    dispatch({
     type: types.addMessage,
     payload: {
      origin: 'from',
      message: '',
      date: new Date().toString(),
      file,
     },
    });
   } else {
    dispatch({
     type: types.addTeamsMessage,
     payload: {
      origin: 'from',
      message: '',
      date: new Date().toString(),
      file,
     },
    });
   }
  });

  setTimeout(() => {
   scrollToBottomAnimated('messages');
  }, 50);
 };

 const fileHandler = (e) => {
  dispatchFiles(Array.from(e.target.files));
 };

 const sendMessage = async (event) => {
  if (event.key === 'Enter' && message.length > 0) {
   if (activeTeam.name === 'contacts') {
    EPMessages.createMessage(message).then(async (data) => {
     if (data) {
      await dispatch({
       type: types.addMessage,
       payload: {
        origin: 'from',
        message: message,
        date: new Date().toString(),
       },
      });

      addToast('Message sent successfully', {
       appearance: 'success',
      });
     } else {
      addToast(
       `Server error, make sure that you have connected to a network or WiFi`,
       {
        appearance: 'error',
       }
      );
     }
    });
   } else {
    await dispatch({
     type: types.addTeamsMessage,
     payload: {
      team: activeTeam.name,
      message: {
       origin: 'from',
       message: message,
       date: new Date().toString(),
      },
     },
    });
   }
  }
 };

 const printDocument = () => {
  const input = document.getElementById('divToPrint');
  html2canvas(input).then((canvas) => {
   const imgData = canvas.toDataURL('image/png');
   const pdf = new jsPDF();
   pdf.setFontSize(15);
   pdf.text(35, 25, `${activeContact.name} | Diana Laura Cruz Cruz`);
   pdf.setFontSize(6);
   pdf.text(35, 28, format(new Date(), 'MMMM dd, y'));
   pdf.addImage(imgData, 'JPEG', 10, 35);
   pdf.save('download.pdf');
  });
 };

 // TODO: Test endpoints
 useEffect(() => {
  EPCompanies.indexCompanies().then((data) => {
   if (data) {
    addToast('Get Companies works!', {
     appearance: 'success',
    });
   } else {
    addToast('Get Companies does not works!', {
     appearance: 'error',
    });
   }
  });
  EPCompanies.singleCompany().then((data) => {
   if (data) {
    addToast('Get Company works!', {
     appearance: 'success',
    });
   } else {
    addToast('Get Company does not works!', {
     appearance: 'error',
    });
   }
  });
 }, []);

 return (
  <div className="chat">
   <div className="chat__header">
    <div className="chat__user-info b-shadow">
     <img className="circle-img" src="https://picsum.photos/200/200" alt="" />
     {activeTeam.name === 'contacts' ? (
      <div>
       <h3>{activeContact.name}</h3>
       <span>{activeContact.phone}</span>
      </div>
     ) : (
      <div>
       <h3>{activeTeam.name.toUpperCase()}</h3>
       <span>{activeTeam.phone}</span>
      </div>
     )}
    </div>

    <div className="chat__action-buttons">
     <button
      onClick={printDocument}
      value="Download"
      className="btn btn-primary btn-block"
     >
      Print <i className="fa fa-print"></i>
     </button>
     <button className="btn btn-primary btn-block">
      <i className="fas fa-angle-double-down"></i>
     </button>
    </div>
   </div>

   <Messages dispatchFiles={dispatchFiles} />

   <div className="chat__input">
    <input
     onChange={onChange}
     value={message}
     onKeyDown={sendMessage}
     type="text"
     placeholder="Write a message..."
    />
    <button onClick={sendMessage}>
     <i className="fa fa-paper-plane"></i>
    </button>
    <input multiple type="file" onChange={fileHandler} className="foo" />
   </div>
  </div>
 );
};
