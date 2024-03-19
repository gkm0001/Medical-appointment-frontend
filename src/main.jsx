import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

 
ReactDOM.createRoot(document.getElementById('root')).render(


     <React.StrictMode>

                    <Auth0Provider


                        domain="dev-e4m0a6517y5uc8jc.us.auth0.com"
                        clientId="ghsNrX7yrc60GxIOjE7BtTAPG9mt4INz"
                        authorizationParams={{
                          redirect_uri: window.location.origin
                        }}
                        >
                            
                          <App />
                  
                    </Auth0Provider>,

                    
            
    
       </React.StrictMode>
  
   
  
)
