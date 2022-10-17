import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

function Postcode(props) {

//   const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소

  const [OpenPost, setOpenPost] = useState(false);

  const address = props.address;
  const setAddress = props.setAddress;

  const onChangeOpenPost = () => {
    setOpenPost(!OpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += ( extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName );
      }
      fullAddr += ( extraAddr !== '' ? ` (${extraAddr})` : '' );
    }

    console.log(data)
    setAddress(data.address);
    setAddressDetail(fullAddr);
    setOpenPost(false);
  };

  const postCodeStyle = {
    // display: 'block',
    // position: 'absolute',
    // top: '180px',
    // left: '700px',
    width: '400px',
    height: '410px',
    // padding: '7px',
  };

  return (
    <div>
        {/* <button type='button' onClick={onChangeOpenPost}>우편번호 검색</button>
        {OpenPost ? ( */}
            <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
            {/* ) : null} */}
    </div>
  );
};

export default Postcode;