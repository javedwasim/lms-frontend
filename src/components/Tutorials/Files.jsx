import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function Files({ maindata }) {
  const [url, Seturl] = useState('');
  const [showpdf, setShowpdf] = useState(false);
  const [videoshow, setShowVideo] = useState(false);

  const seturlofpdf = (url) => {
    setShowpdf(true);
    Seturl(url);
  };

  const setVideo = (url) => {
    setShowVideo(true);
    Seturl(url);
  };

  const downloadImage = async (image) => {
    const a = document.createElement('a');

    a.setAttribute('download', 'LMS.png');
    a.setAttribute('href', image);
    a.click();
  };

  return (
    <div>
      {maindata?.files?.subfiles?.map((value, ins) => (
        <div key={ins}>
          {value?.type == 'image' ? (
            <div className="pdf-view mb-2">
              <div>
                <p>{value.title}</p>
              </div>

              <div>
                <button
                  className="click-btm"
                  onClick={() => seturlofpdf(value.imageurl)}
                >
                  View
                </button>
                {value.is_downloadable == 'Yes' ? (
                  <>
                    <button
                      className="click-btm mx-2"
                      img-data={value.imageurl}
                      onClick={() => downloadImage(value.imageurl)}
                    >
                      Download
                    </button>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}

          {value?.type == 'pdf' ? (
            <div className="pdf-view mb-2">
              <div>
                <p>{value.title}</p>
              </div>

              <div>
                <button
                  className="click-btm"
                  onClick={() => seturlofpdf(value.imageurl)}
                >
                  View
                </button>
                {value.is_downloadable == 'Yes' ? (
                  <button className="click-btm mx-2">
                    <a href={`${value.imageurl}`} download target="_blank">
                      Download
                    </a>{' '}
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          {value?.type == 'video' ? (
            <div className="pdf-view mb-2">
              <div>
                <p>{value.title}</p>
              </div>

              <div>
                <button
                  className="click-btm"
                  onClick={() => setVideo(value.imageurl)}
                >
                  View
                </button>
                {value.is_downloadable == 'Yes' ? (
                  <button className="click-btm mx-2">
                    <a href={`${value.imageurl}`} target="_blank" download>
                      Download
                    </a>{' '}
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          {value?.type == 'embed' ? (
            <div className="pdf-view">
              <div>
                <p>{value.title}</p>
              </div>

              <div>
                <button
                  className="click-btm"
                  onClick={() => seturlofpdf(value.imageurl)}
                >
                  View
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
      <div>
        <p>{maindata?.files?.description}</p>
      </div>

      {
        <Modal
          show={showpdf}
          fullscreen={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => setShowpdf(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <iframe
              src={url + '#toolbar=0'}
              style={{ height: '100%', width: '100%' }}
            ></iframe>
          </Modal.Body>
        </Modal>
      }

      {
        <Modal
          show={videoshow}
          fullscreen={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => setShowVideo(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <video
              style={{ height: '100%', width: '100%' }}
              controls
              autoPlay
              controlsList="nodownload"
              oncontextmenu="return false;"
            >
              <source src={url} type="video/mp4" />
            </video>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
}
