import React, { useRef, useState } from 'react';

import Popup from 'reactjs-popup';
import { useToasts } from 'react-toast-notifications';
import { postSMS } from '../../API/sms/SmsPost.api';

export const NumberMessage = ({ trigger }) => {
 const ref = useRef();
 const [files, setFiles] = useState([]);
 const { addToast } = useToasts();
 const [sms, setSms] = useState('');
 const [number, setNumber] = useState();

 const closeTooltip = () => ref.current.close();

 const fileHandler = (e) => {
  setFiles([...e.target.files, ...files]);
 };

 const sendMessage = async () => {
  if (sms.length > 0 && number.length > 0) {
   postSMS(sms, number);

   addToast(`Message '${sms}' was sent successfully.`, {
    appearance: 'info',
   });

   closeTooltip();
  } else {
   addToast(
    `You need to provide a number and a message with length more than 1.`,
    {
     appearance: 'error',
    }
   );
  }
 };

 const onChange = ({ target }) => {
  setSms(target.value);
 };

 const onChangePhone = ({ target }) => {
  setNumber(target.value);
 };

 return (
  <Popup ref={ref} trigger={trigger} modal>
   {(close) => (
    <div className="popup__number">
     <h4>Number Message</h4>

     <div className="message">
      <div className="popup__field">
       <label>Phone</label>
       <input
        onChange={onChangePhone}
        value={number}
        type="number"
        name="phone"
        placeholder="Phone Number..."
       />
      </div>
      <label class="toggler__label">
       <input type="checkbox" hidden />
       <span>SMS</span>
       <div class="toggler"></div>
       <span>MSS</span>
      </label>
      <div className="popup__field">
       <label>Message</label>
       <textarea
        onChange={onChange}
        value={sms}
        type="text"
        name="message"
        placeholder="Message..."
       />
      </div>
      <div className="files__img">
       {files.map((file) => (
        <img src={URL.createObjectURL(file)} alt={file.name} />
       ))}
      </div>
     </div>

     <div className="popup__actions">
      <input multiple type="file" onChange={fileHandler} className="foo" />
      <button onClick={sendMessage}>Send</button>
      <button onClick={close}>Close</button>
     </div>
    </div>
   )}
  </Popup>
 );
};
