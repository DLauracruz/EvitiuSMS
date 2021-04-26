import React, { useRef, useState } from 'react';

import Popup from 'reactjs-popup';

export const NumberMessage = ({ trigger }) => {
	const ref = useRef();
	const [files, setFiles] = useState([]);

	const fileHandler = (e) => {
		console.log(e.target.files);
		setFiles([...e.target.files, ...files]);
		console.log(files);
	};

	return (
		<Popup ref={ref} trigger={trigger} modal>
			{(close) => (
				<div className="popup__number">
					<h4>Number Message</h4>

					<div className="message">
						<div className="popup__field">
							<label>Phone</label>
							<input type="text" name="phone" placeholder="Phone Number..." />
						</div>
						<label class="toggler__label">
							<input type="checkbox" hidden />
							<span>SMS</span>
							<div class="toggler"></div>
							<span>MSS</span>
						</label>
						<div className="popup__field">
							<label>Message</label>
							<textarea type="text" name="message" placeholder="Message..." />
						</div>
						<div className="files__img">
							{files.map((file) => (
								<img src={URL.createObjectURL(file)} alt={file.name} />
							))}
						</div>
					</div>

					<div className="popup__actions">
						<input multiple type="file" onChange={fileHandler} className="foo" />
						<button>Send</button>
						<button onClick={close}>Close</button>
					</div>
				</div>
			)}
		</Popup>
	);
};
