import React, { useState } from 'react';
import { Navbar } from '../navigation/components/Navbar';
import { tryOn } from "./TryOnAPI";
import Lottie from 'lottie-react' 
import { loadingAnimation } from '../../assets';
import { Stack } from '@mui/material';


const TryOnForm = () => {
  const [userImage, setUserImage] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [clothImagePreview, setClothImagePreview] = useState(null);
  const [category, setCategory] = useState('1');
  const [caption, setCaption] = useState('red, T-shirt');
  const [tryOnResponse, setTryOnResponse] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleImageChange = (e, setImage, setImagePreview) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(file);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log({
      userImage,
      clothImage,
      category,
      caption
    });

    try {
      const response = await tryOn(userImage, clothImage, category);
      console.log("Tryon response", response);
      setLoading(false);

      setTryOnResponse(response. tryon_image_url);
    } catch (error) {
      console.log(error);
    }
    // Handle the form submission logic here
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
  };

  const containerStyle = {
    backgroundColor: '#E5E7EB',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    color: '#6B46C1',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  };

  const imageUploadContainerStyle = {
    border: '1px solid #D6BCFA',
    padding: '1rem',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const uploadLabelStyle = {
    color: '#6B46C1',
    fontWeight: '500',
    marginBottom: '0.5rem',
  };

  const uploadIconStyle = {
    width: '96px',
    height: '96px',
    backgroundColor: '#F3E8FF',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  

  const textStyle = {
    color: '#A0AEC0',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  };

  const inputStyle = {
    width: '100%',
    border: '1px solid #D6BCFA',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    marginTop: '0.25rem',
  };

  const buttonStyle = {
    backgroundColor: '#6B46C1',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
  };

  const creditTextStyle = {
    color: '#A0AEC0',
    fontSize: '0.875rem',
  };

  return (
    <>
      <Navbar />

      
      {loading ? 
      <div style={{
        backgroundColor: '#E5E7EB',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      <Stack width={'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} alignItems={'center'}>
      <Lottie animationData={loadingAnimation}/>
</Stack>
      </div>
        :

      (tryOnResponse ? (
        
        <div style={{
          textAlign: 'center ',
          marginTop: '4rem',
        }}>
          <h1 
          style={{
            fontSize: '1.7rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            border: '6px solid #D6BCFA',
          }}
          >Tryon Response</h1> 
          <div style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}>

           <img
           style={{
              width: '20rem',
              height: 'fit-content',
              maxWidth: '800px',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
           }}
           src={tryOnResponse} alt="Tryon Response" />
           </div>
        </div>
      ) : (
        <div style={containerStyle}>
          <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={titleStyle}>Try-On</h2>

            <div style={gridStyle}>
              {/* User Image */}
              <div style={imageUploadContainerStyle}>
                <label style={uploadLabelStyle}>User Image *</label>
                <input
                  type="file"
                  id="userImageUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageChange(e, setUserImage, setUserImagePreview)}
                />
                <label htmlFor="userImageUpload" style={uploadIconStyle}>
                  {userImagePreview ? (
                    <img src={userImagePreview} alt="User Preview" style={{ width: '96px', height: '96px', borderRadius: '50%' }} />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      style={{ width: '48px', height: '48px', color: '#9F7AEA' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7h18M9 3h6M12 10v10m0 0l-2.5-2.5M12 20l2.5-2.5M21 12h2m-2 0h-2"
                      />
                    </svg>
                  )}
                </label>
                <p style={textStyle}>Upload an image, size up to 5MB.</p>
              </div>

              {/* Cloth Image */}
              <div style={imageUploadContainerStyle}>
                <label style={uploadLabelStyle}>Cloth Image *</label>
                <input
                  type="file"
                  id="clothImageUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageChange(e, setClothImage, setClothImagePreview)}
                />
                <label htmlFor="clothImageUpload" style={uploadIconStyle}>
                  {clothImagePreview ? (
                    <img src={clothImagePreview} alt="Cloth Preview" style={{ width: '96px', height: '96px', borderRadius: '50%' }} />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      style={{ width: '48px', height: '48px', color: '#9F7AEA' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7h18M9 3h6M12 10v10m0 0l-2.5-2.5M12 20l2.5-2.5M21 12h2m-2 0h-2"
                      />
                    </svg>
                  )}
                </label>
                <p style={textStyle}>Upload an image, size up to 5MB.</p>
              </div>
            </div>

            <div style={gridStyle}>
              {/* Category Dropdown */}
              <div>
                <label style={uploadLabelStyle}>Category *</label>
                <select
                  style={inputStyle}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="1">Upper Body</option>
                  <option value="2">Lower Body</option>
                  <option value="3">Dresses</option>
                  <option value="4">Full Body</option>
                  <option value="5">Hair</option>
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button type="submit" style={buttonStyle}>
                Try On
              </button>
            </div>
          </form>
        </div>
      ))

    }


    </>
  );
};

export default TryOnForm;