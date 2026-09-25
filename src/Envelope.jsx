import { useState, useEffect } from 'react';
import teaser2 from './assets/Teaser 2.png';
import sealImage from './assets/logo_only.png';
import { CircularProgress } from '@material-ui/core';

export default function InteractiveEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const imageSources = [teaser2, sealImage];

    const preloadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });

    Promise.all(imageSources.map(preloadImage))
      .then(() => {
        setImagesReady(true);
        setTimeout(() => setIsOpen(true), 50);
      })
      .catch(() => setImagesReady(false));
  }, []);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
  };

  if (!imagesReady) {
    // return (
    //   <div style={styles.container}>
    //     <div style={styles.spinnerWrap}>
    //       <div style={styles.spinner} aria-label="Loading envelope" />
    //     </div>
    //   </div>
    // );
    return <div style={styles.container}>
        <CircularProgress />
        </div>
  }

  return (
    <div style={styles.container}>
      {/* Injecting dynamic CSS classes directly via standard style tags to keep it single-file */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .envelope-wrapper {
          position: relative;
          cursor: pointer;
        }

        .download-button {
          margin-top: 16px;
          border: none;
          background: #2d333e;
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
          box-shadow: 0 8px 18px rgba(45, 51, 62, 0.25);
        }

        .download-button:hover {
          transform: translateY(-1px);
          opacity: 0.96;
        }

        .envelope {
          position: relative;
          width: 280px;
          height: 180px;
          background: linear-gradient(160deg, #343b47 0%, #1f252e 100%);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-radius: 0 0 8px 8px;
        }

        /* The Top Flap Hinge */
        .flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 140px solid transparent;
          border-right: 140px solid transparent;
          border-top: 100px solid #2d333e;
          transform-origin: top;
          transition: transform 0.4s ease 0.2s, z-index 0.2s ease 0.2s;
          z-index: 4;
        }

        /* Front Pocket Layer */
        .pocket {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 140px solid #3a424f;
          border-right: 140px solid #272d38;
          border-bottom: 100px solid #272d38;
          border-top: 80px solid transparent;
          border-radius: 0 0 8px 8px;
          z-index: 3;
        }

        /* Hidden Inner Paper */
        .letter {
          position: absolute;
          bottom: 10px;
          left: 15px;
          width: 250px;
          height: 150px;
          background-color: #ffffff;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.45s ease 0s;
          z-index: 2;
          overflow: hidden;
        }

        .letter-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: #ffffff;
        }

        .seal {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 6;
          border-radius: 50%;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.15), 0 5px 12px rgba(0,0,0,0.35);
        }

        .seal-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          border-radius: 50%;
        }

        .envelope-wrapper.open .flap {
          transform: rotateX(180deg);
          z-index: 1;
          transition: transform 0.45s ease 0s, z-index 0.2s ease 0s;
        }

        .envelope-wrapper.open .letter {
          transform: translateY(-90px);
          transition: transform 0.45s ease 0.2s;
        }

        .envelope-wrapper:not(.open) .letter {
          transform: translateY(0px);
          transition: transform 0.45s ease 0s;
        }

        .envelope-wrapper:not(.open) .flap {
          transform: rotateX(0deg);
          transition: transform 0.45s ease 0.2s, z-index 0.2s ease 0.2s;
        }
      `}</style>

      {/* Main Structural Assembly */}
      <div style={styles.envelopeColumn}>
        <div 
          className={`envelope-wrapper ${isOpen ? 'open' : ''}`} 
          onClick={toggleEnvelope}
          aria-label="Click to open envelope"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleEnvelope()}
        >
          <div className="envelope">
            <div className="flap"></div>
            <div className="pocket"></div>
            <div className="seal" aria-hidden="true">
              <img className="seal-image" src={sealImage} alt="seal" />
            </div>
            <div className="letter">
              <img
                className="letter-image"
                src={teaser2}
                alt="Invitation artwork"
              />
            </div>
          </div>
        </div>

        <button
          className="download-button"
          type="button"
          onClick={() => {
            const link = document.createElement('a');
            link.href = teaser2;
            link.download = 'invitation.jpg';
            link.click();
          }}
        >
          Download invitation
        </button>
      </div>
    </div>
  );
}

// Global Layout Positioning
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    margin: 0,
  },
  envelopeColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  spinner: {
    width: 38,
    height: 38,
    border: '4px solid rgba(0,0,0,0.12)',
    borderTop: '4px solid #2d333e',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};
