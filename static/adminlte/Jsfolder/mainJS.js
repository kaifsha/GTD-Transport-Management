

      function setupInsuranceFleetSearchFunctionality(row) {
        // Create overlay and container if they don't exist
        if (!document.querySelector('.insurance-search-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'insurance-search-overlay';
            document.body.appendChild(overlay);
        }
    
        if (!document.querySelector('.insurance-search-container')) {
            const container = document.createElement('div');
            container.className = 'insurance-search-container';
            container.innerHTML = `
                <div class="insurance-search-header">
                    <h3>Select Insurance Company</h3>
                    <span class="insurance-close-icon">&times;</span>
                </div>
                <table class="insurance-search-results">
                    <thead>
                        <tr>
                            <th>Insurance Company</th>
                            <th>Policy No</th>
                            <th>Policy Date</th>
                            <th>Policy Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `;
            document.body.appendChild(container);
        }
    
        const insuranceFleetCompanyInput = row.querySelector('[name="INSURANCE_COMPANY"]');
        const policyNoInput = row.querySelector('[name="POLICY_NO"]');
        const policyDateInput = row.querySelector('[name="POLICY_DATE"]');
        const policyExpiryDateInput = row.querySelector('[name="POLICY_EXPIRY_DATE"]');
    
        const overlay = document.querySelector('.insurance-search-overlay');
        const container = document.querySelector('.insurance-search-container');
        const closeIcon = container.querySelector('.insurance-close-icon');
        const resultsTable = container.querySelector('.insurance-search-results tbody');
    
        // Add loading state
        let isLoading = false;
    
        insuranceFleetCompanyInput.addEventListener('click', async () => {
            if (isLoading) return;
            
            try {
                isLoading = true;
                insuranceFleetCompanyInput.style.cursor = 'wait';
                
                const response = await fetch('http://127.0.0.1:8000/api/insurance-info');
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
    
                resultsTable.innerHTML = '';
                data.forEach(info => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${info.INSURANCE_COMPANY || ''}</td>
                        <td>${info.POLICY_NO || ''}</td>
                        <td>${info.POLICY_DATE || ''}</td>
                        <td>${info.POLICY_EXPIRY_DATE || ''}</td>
                    `;
                    
                    row.addEventListener('click', () => {
                      insuranceFleetCompanyInput.value = info.INSURANCE_COMPANY || '';
                        policyNoInput.value = info.POLICY_NO || '';
                        policyDateInput.value = info.POLICY_DATE || '';
                        policyExpiryDateInput.value = info.POLICY_EXPIRY_DATE || '';
                        
                        // Make fields readonly
                        policyNoInput.readOnly = true;
                        policyDateInput.readOnly = true;
                        policyExpiryDateInput.readOnly = true;
                        
                        hidePopup();
                    });
                    
                    resultsTable.appendChild(row);
                });
    
                showPopup();
            } catch (error) {
                console.error('Error fetching insurance info:', error);
                alert('Failed to load insurance companies. Please try again.');
            } finally {
                isLoading = false;
                insuranceFleetCompanyInput.style.cursor = 'pointer';
            }
        });
    
        function showPopup() {
            overlay.style.display = 'block';
            container.style.display = 'block';
            setTimeout(() => container.style.opacity = '1', 0);
        }
    
        function hidePopup() {
            container.style.opacity = '0';
            overlay.style.display = 'none';
            container.style.display = 'none';
        }
    
        // Close popup handlers
        closeIcon.addEventListener('click', hidePopup);
        overlay.addEventListener('click', hidePopup);
    
        // Prevent popup close when clicking inside container
        container.addEventListener('click', (e) => e.stopPropagation());
    
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && container.style.display === 'block') {
                hidePopup();
            }
        });
    
        // Add visual feedback for input
        insuranceFleetCompanyInput.addEventListener('mouseover', () => {
            if (!isLoading) {
              insuranceFleetCompanyInput.style.backgroundColor = '#f8f9fa';
            }
        });
    
        insuranceFleetCompanyInput.addEventListener('mouseout', () => {
            insuranceFleetCompanyInput.style.backgroundColor = '#ffff76';
        });
    }


    function setupDriverSearchFunctionality(row) {
      if (!document.querySelector('.driver-search-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'driver-search-overlay';
          document.body.appendChild(overlay);
      }
  
      if (!document.querySelector('.driver-search-container')) {
          const container = document.createElement('div');
          container.className = 'driver-search-container';
          container.innerHTML = `
              <div class="driver-search-header">
                  <h3>Select Driver Information</h3>
                  <span class="driver-close-icon">&times;</span>
              </div>
              <table class="driver-search-results">
                  <thead>
                      <tr>
                          <th>Employee No</th>
                          <th>Employee Name</th>
                          <th>Designation</th>
                          <th>Contact Number</th>
                      </tr>
                  </thead>
                  <tbody></tbody>
              </table>
          `;
          document.body.appendChild(container);
      }
  
      const employeeNoInput = row.querySelector('[name="EMPLOYEE_NO"]');
      const employeeNameInput = row.querySelector('[name="EMPLOYEE_NAME"]');
      const designationInput = row.querySelector('[name="DESIGNATION"]');
      const contactNumberInput = row.querySelector('[name="CONTACT_NUMBER"]');
  
      const overlay = document.querySelector('.driver-search-overlay');
      const container = document.querySelector('.driver-search-container');
      const closeIcon = container.querySelector('.driver-close-icon');
      const resultsTable = container.querySelector('.driver-search-results tbody');
  
      let isLoading = false;
  
      employeeNoInput.addEventListener('click', async () => {
          if (isLoading) return;
          
          try {
              isLoading = true;
              employeeNoInput.style.cursor = 'wait';
              
              const response = await fetch('http://127.0.0.1:8000/api/driver-info');
              if (!response.ok) throw new Error('Network response was not ok');
              
              const data = await response.json();
  
              resultsTable.innerHTML = '';
              data.forEach(info => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${info.EMPLOYEE_NO || ''}</td>
                      <td>${info.EMPLOYEE_NAME || ''}</td>
                      <td>${info.DESIGNATION || ''}</td>
                      <td>${info.CONTACT_NUMBER || ''}</td>
                  `;
                  
                  row.addEventListener('click', () => {
                      employeeNoInput.value = info.EMPLOYEE_NO || '';
                      employeeNameInput.value = info.EMPLOYEE_NAME || '';
                      designationInput.value = info.DESIGNATION || '';
                      contactNumberInput.value = info.CONTACT_NUMBER || '';
                      
                      // Make fields readonly
                      employeeNameInput.readOnly = true;
                      designationInput.readOnly = true;
                      contactNumberInput.readOnly = true;
                      
                      hidePopup();
                  });
                  
                  resultsTable.appendChild(row);
              });
  
              showPopup();
          } catch (error) {
              console.error('Error fetching driver info:', error);
              alert('Failed to load driver information. Please try again.');
          } finally {
              isLoading = false;
              employeeNoInput.style.cursor = 'pointer';
          }
      });
  
      function showPopup() {
          overlay.style.display = 'block';
          container.style.display = 'block';
          setTimeout(() => container.style.opacity = '1', 0);
      }
  
      function hidePopup() {
          container.style.opacity = '0';
          overlay.style.display = 'none';
          container.style.display = 'none';
      }
  
      closeIcon.addEventListener('click', hidePopup);
      overlay.addEventListener('click', hidePopup);
      container.addEventListener('click', (e) => e.stopPropagation());
  
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && container.style.display === 'block') {
              hidePopup();
          }
      });
  
      employeeNoInput.addEventListener('mouseover', () => {
          if (!isLoading) {
              employeeNoInput.style.backgroundColor = '#f8f9fa';
          }
      });
  
      employeeNoInput.addEventListener('mouseout', () => {
          employeeNoInput.style.backgroundColor = '#ffff76';
      });
  }
  
    
    
    function setupRegistrationSearchFunctionality(row) { if (!document.querySelector('.registration-search-overlay')) { const overlay = document.createElement('div'); overlay.className = 'registration-search-overlay'; document.body.appendChild(overlay); }
    
    
      if (!document.querySelector('.registration-search-container')) {
        const container = document.createElement('div');
        container.className = 'registration-search-container';
        container.innerHTML = `
            <div class="registration-search-header">
                <h3>Select Traffic File Information</h3>
                <span class="registration-close-icon">&times;</span>
            </div>
            <table class="registration-search-results">
                <thead>
                    <tr>
                        <th>Traffic File No</th>
                        <th>Company Name</th>
                        <th>Trade License No</th>
                        <th>Emirates</th>
                        <th>Federal Traffic File No</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        document.body.appendChild(container);
    }
    
          const emiratesFileInput = row.querySelector('[name="EMIRATES_TRF_FILE_NO"]');
          const registeredEmiratesInput = row.querySelector('[name="REGISTERED_EMIRATES"]');
          const federalFileInput = row.querySelector('[name="FEDERAL_TRF_FILE_NO"]');
          const companyNameInput = row.querySelector('[name="REG_COMPANY_NAME"]');
          const tradeLicenseInput = row.querySelector('[name="TRADE_LICENSE_NO"]');
    
          const overlay = document.querySelector('.registration-search-overlay');
          const container = document.querySelector('.registration-search-container');
          const closeIcon = container.querySelector('.registration-close-icon');
          const resultsTable = container.querySelector('.registration-search-results tbody');
    
          let isLoading = false;
    
          emiratesFileInput.addEventListener('click', async () => {
              if (isLoading) return;
              
              try {
                  isLoading = true;
                  emiratesFileInput.style.cursor = 'wait';
                  
                  const response = await fetch('http://127.0.0.1:8000/api/traffic-file-info');
                  if (!response.ok) throw new Error('Network response was not ok');
                  
                  const data = await response.json();
    
                  resultsTable.innerHTML = '';
                  data.forEach(info => {
                      const row = document.createElement('tr');
                      row.innerHTML = `
                          <td>${info.TRAFFIC_FILE_NO || ''}</td>
                          <td>${info.COMPANY_NAME || ''}</td>
                          <td>${info.TRADE_LICENSE_NO || ''}</td>
                          <td>${info.EMIRATES || ''}</td>
                          <td>${info.FEDERAL_TRAFFIC_FILE_NO || ''}</td>
                      `;
                      
                      row.addEventListener('click', () => {
                          emiratesFileInput.value = info.TRAFFIC_FILE_NO || '';
                          registeredEmiratesInput.value = info.EMIRATES || '';
                          federalFileInput.value = info.FEDERAL_TRAFFIC_FILE_NO || '';
                          companyNameInput.value = info.COMPANY_NAME || '';
                          tradeLicenseInput.value = info.TRADE_LICENSE_NO || '';
                          
                          // Make fields readonly
                          registeredEmiratesInput.readOnly = true;
                          federalFileInput.readOnly = true;
                          companyNameInput.readOnly = true;
                          tradeLicenseInput.readOnly = true;
                          
                          hidePopup();
                      });
                      
                      resultsTable.appendChild(row);
                  });
    
                  showPopup();
              } catch (error) {
                  console.error('Error fetching traffic file info:', error);
                  alert('Failed to load traffic file information. Please try again.');
              } finally {
                  isLoading = false;
                  emiratesFileInput.style.cursor = 'pointer';
              }
          });
    
          function showPopup() {
              overlay.style.display = 'block';
              container.style.display = 'block';
              setTimeout(() => container.style.opacity = '1', 0);
          }
    
          function hidePopup() {
              container.style.opacity = '0';
              overlay.style.display = 'none';
              container.style.display = 'none';
          }
    
          closeIcon.addEventListener('click', hidePopup);
          overlay.addEventListener('click', hidePopup);
          container.addEventListener('click', (e) => e.stopPropagation());
    
          document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape' && container.style.display === 'block') {
                  hidePopup();
              }
          });
    
          emiratesFileInput.addEventListener('mouseover', () => {
              if (!isLoading) {
                  emiratesFileInput.style.backgroundColor = '#f8f9fa';
              }
          });
    
          emiratesFileInput.addEventListener('mouseout', () => {
              emiratesFileInput.style.backgroundColor = '#ffff76';
          });
        }
    
    

            function showLoadingIndicator() {
              const loadingOverlay = document.createElement('div');
              loadingOverlay.id = 'loadingOverlay';
              loadingOverlay.style.position = 'fixed';
              loadingOverlay.style.top = '0';
              loadingOverlay.style.left = '0';
              loadingOverlay.style.width = '100%';
              loadingOverlay.style.height = '100%';
              loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
              loadingOverlay.style.display = 'flex';
              loadingOverlay.style.justifyContent = 'center';
              loadingOverlay.style.alignItems = 'center';
              loadingOverlay.style.zIndex = '9999';
          
              const spinner = document.createElement('div');
              spinner.className = 'spinner';
              spinner.style.width = '50px';
              spinner.style.height = '50px';
              spinner.style.border = '3px solid #f3f3f3';
              spinner.style.borderTop = '3px solid #3498db';
              spinner.style.borderRadius = '50%';
              spinner.style.animation = 'spin 1s linear infinite';
          
              loadingOverlay.appendChild(spinner);
              document.body.appendChild(loadingOverlay);
          }
          
          function hideLoadingIndicator() {
              const loadingOverlay = document.getElementById('loadingOverlay');
              if (loadingOverlay) {
                  loadingOverlay.remove();
              }
          }
          
          // Add this CSS to your stylesheet or in a <style> tag in your HTML
          const style = document.createElement('style');
          style.textContent = `
              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
          `;
          document.addEventListener('DOMContentLoaded', function() {
            const fleetCreationDateInput = document.getElementById('fleetCreationDate');
            
            // Set today's date as the default value
            const today = new Date().toISOString().split('T')[0];
            fleetCreationDateInput.value = today;
            
            // Update the date value before form submission
            document.getElementById('vehicleForm').addEventListener('submit', function(event) {
                const currentDate = new Date().toISOString().split('T')[0];
                fleetCreationDateInput.value = currentDate;
            });
            
            // Also update date when clicking submit button
            document.getElementById('submitForm').addEventListener('click', function() {
                const currentDate = new Date().toISOString().split('T')[0];
                fleetCreationDateInput.value = currentDate;
            });
        });
        

                document.addEventListener('DOMContentLoaded', function() {
                  const urlParams = new URLSearchParams(window.location.search);
                  const fleetNumber = urlParams.get('fleet_number');
                  const fromApprover = urlParams.get('from_approver');

                  if (fleetNumber && fromApprover === 'true') {
                    populateFormFields(fleetNumber,true);
                  }
                });
                window.addEventListener('unhandledrejection', function(event) {
                  console.error('Unhandled promise rejection:', event.reason);
                });




                async function handleRevert() {
                  console.log("handleRevert function called");

                  const fleetControlNumber = document.querySelector('[name="HEADER_ID"]').value;
                  console.log("Fleet Control Number:", fleetControlNumber);
                  const comment = document.querySelector('textarea[name="COMMENTS"]').value.trim();
                  
                  // Comment validation
                  if (!comment) {
                    alert('Please add comments before reverting this request');
                    return;
                  }

                  if (confirm("Are you sure you want to revert this request?")) {
                    try {
                      showLoadingIndicator();
                      console.log("Sending revert request...");
                      const response = await fetch(`http://127.0.0.1:8000/api/revert-data/${fleetControlNumber}`, {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });

                      const result = await response.json();

                      if (!response.ok) {
                        if (response.status === 400 && result.message === "No approved data found for this HEADER_ID") {
                          throw new Error("There are no approved records to revert.");
                        } else {
                          throw new Error(`HTTP error! status: ${response.status}`);
                        }
                      }

                      console.log("Revert response:", result);
                      
                      // Send email notification after successful revert
                      try {
                        await showComposeModal(
                          fleetControlNumber,
                          'Revert',  // Action type
                          true,      // isApprover
                          comment    // Comments
                        );
                        console.log("Email sent successfully for revert action");
                      } catch (emailError) {
                        console.error('Error sending revert notification email:', emailError);
                        // Continue with the process even if email fails
                      }

                      alert(result.message);
                      window.location.reload();
                      console.log("Navigating to approver dashboard...");
                      window.location.href = '/ALY_GTD/approver_dashboard/';
                    } catch (error) {
                      console.error('Error:', error);
                      alert(`Failed to revert: ${error.message}`);
                    } finally {
                      hideLoadingIndicator();
                    }
                  } else {
                    console.log("Revert cancelled by user");
                  }
                }

                // Event listener for the revert button
                document.addEventListener('DOMContentLoaded', function() {
                  const revertBtn = document.getElementById('revertBtn');
                  if (revertBtn) {
                    console.log("Attaching event listener to revert button");
                    revertBtn.addEventListener('click', function(event) {
                      console.log("Revert button clicked");
                      handleRevert();
                    });
                  } else {
                    console.error("Revert button not found in DOM");
                  }
                });


                function clearCachedData() {
                  localStorage.removeItem('currentFleetControlNumber');
                  localStorage.removeItem('currentFleetStatus');
                }

                //approver handlings
                document.addEventListener("DOMContentLoaded", function () {
                  setupDropdowns();
                  hideCancelButton();
                });

                function afterPopulateForm() {
                  disableAllFields();
                  showEditButton();
                  updateEditButtonState(document.querySelector('[name="STATUS"]').value);
                  const status = document.querySelector('[name="STATUS"]').value;
                  if (status && status.toLowerCase() !== 'draft') {
                    document.querySelector('#cancelForm').style.display = 'block';
                  } else {
                      hideCancelButton();
                    }
                }

                
                document.addEventListener('DOMContentLoaded', function() {
                  const urlParams = new URLSearchParams(window.location.search);
                  const fromApprover = urlParams.get('from_approver') === 'true';
                  const isApprover = JSON.parse(document.getElementById('user_roles').textContent).is_approver;
                  const fleetControlNumber = document.querySelector('[name="FLEET_CONTROL_NO"]').value;
                  sessionStorage.setItem('originPage', fromApprover ? 'approver' : 'non-approver');
                  if (fromApprover) {
                    console.log("This is an Approver Page");
                  } else {
                    console.log("This is a Non-Approver Page");
                  }
                  if (fromApprover) {
                      makeFieldsReadOnly(true);
                      hideRegularButtons();
                      if (isApprover) {
                          showApproverButtons();
                          document.getElementById('rectificationBtn').addEventListener('click', function() {
                            const comment = document.querySelector('textarea[name="COMMENTS"]').value.trim();
                            
                            if (!comment) {
                              alert('Please add comments before returning for rectification');
                              return;
                          }
                            
                            showLoadingIndicator();
                            confirmAndSubmit('Return for Correction', true, comment);
                        });

                        document.getElementById('approveBtn').addEventListener('click', function() {
                          const comment = document.querySelector('textarea[name="COMMENTS"]').value;
                          showLoadingIndicator();
                          confirmAndSubmit('Approved', true, comment);
                        });

                       
                        document.getElementById('defleetBtn').addEventListener('click', function() {
                          const comment = document.querySelector('textarea[name="COMMENTS"]').value;
                          showLoadingIndicator();
                          confirmAndSubmit('Defleet', true, comment);
                        });


                        
                      }else {
                      // Hide submit button for non-approvers
                      document.getElementById('submitForm').style.display = 'none';
                  }
                      document.getElementById('submitForm').disabled = true;
                  } else {
                      makeFieldsReadOnly(false);
                      document.getElementById('submitForm').addEventListener('click', function() {
                          showComposeModal(fleetControlNumber);
                      });
                  }
                });
                

                function hideRegularButtons() {
                  document.getElementById('newForm').style.display = 'none';
                  document.getElementById('addRow').style.display = 'none';
                  document.getElementById('removeRow').style.display = 'none';
                }

                // let approverButtonsAdded = false;
                function showApproverButtons() {
                  // if (approverButtonsAdded) return;
                  const approverButtons = `
                      <div class="approver-buttons">
                      <div class="container-button">
                        <div class="container-btn">
                          <button class="btn nav-btn approve" id="rectificationBtn">
                              <box-icon name='file-blank' color="blue" class="approver-icon"></box-icon>
                              <span style="font-size: 15px; color: black; margin-left: 5px;">Return for Correction</span>
                          </button>
                          <button class="btn nav-btn approve" id="approveBtn">
                              <box-icon name='check-circle' color="green" class="approver-icon"></box-icon>
                              <span style="font-size: 15px; color: black; margin-left: 5px;">Approved</span>
                          </button>
                        
                         
                          <button class="btn nav-btn approve" id="revertBtn">
                            <box-icon name='undo' color="red" class="approver-icon"></box-icon>
                            <span style="font-size: 15px; color: black; margin-left: 5px;">Revert</span>
                          </button>
                          </div>
                          <div>
                       

                           <button class="btn nav-btn approve" id="defleetBtn">
                               <box-icon name="x-circle" color="red" class="del-icon"></box-icon>
                              <span style="font-size: 15px; color: black; margin-left: 5px;">Defleet</span>
                          </button>
                          </div>
                      </div>
                       </div>
                  `;
                  document.getElementById('submitForm').style.display = 'none'; // Hide the submit button
                  document.getElementById('submitForm').insertAdjacentHTML('afterend', approverButtons);
                  const revertBtn = document.getElementById('revertBtn');
                  if (revertBtn) {
                    console.log("Attaching event listener to revert button");
                    revertBtn.addEventListener('click', function onRevertClick(event) {
                      console.log("Revert button clicked");
                      handleRevert();
                    });
                  } else {
                    console.error("Revert button not found after adding to DOM");
                  }
                  // approverButtonsAdded = true; 
                }

                let formSubmitted = false;

                document.addEventListener('DOMContentLoaded', function() {
                  const rectificationBtn = document.getElementById('rectificationBtn');
                  const approveBtn = document.getElementById('approveBtn');
                  const defleetBtn = document.getElementById('defleetBtn');
                  const statusField = document.querySelector('input[name="STATUS"]');
                 

                  async function fetchEmailAddresses(lookupValue) {
                    try {
                        const response = await fetch(`http://127.0.0.1:8000/api/related-data/?lookup_value=${lookupValue}`);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = await response.json();
                        
                        const toEmail = data.find(item => item.LOOKUP_CODE === 'TO' && item.ACTIVE === 'Y')?.MEANING;
                        const ccEmail = data.find(item => item.LOOKUP_CODE === 'CC' && item.ACTIVE === 'Y')?.MEANING;
                        
                        return { toEmail, ccEmail };
                    } catch (error) {
                        console.error(`Error fetching email addresses for ${lookupValue}:`, error);
                        return null;
                    }
                  }
                
                 
                  // Function to show loading popup and handle email sending result
                  function showEmailSendingPopup(emailSendingPromise) {
                    // Create and show loading popup
                    const popup = document.createElement('div');
                    popup.className = 'email-sending-popup';
                    popup.innerHTML = `
                        <div class="email-sending-content">
                            <div class="loading-spinner"></div>
                            <p>Sending email...</p>
                        </div>
                    `;
                    document.body.appendChild(popup);

                    // Handle the email sending promise
                    emailSendingPromise
                        .then(result => {
                            updatePopupContent(popup, 'success', 'Email sent successfully!');
                        })
                        .catch(error => {
                            updatePopupContent(popup, 'error', 'Failed to send email. Please try again.');
                            console.error('Email sending error:', error);
                        })
                        .finally(() => {
                            // Remove popup after 3 seconds
                            setTimeout(() => {
                                document.body.removeChild(popup);
                            }, 3000);
                        });
                  }


                  function updatePopupContent(popup, status, message) {
                    const content = popup.querySelector('.email-sending-content');
                    content.innerHTML = `
                        <div class="${status}-icon"></div>
                        <p>${message}</p>
                    `;
                  }

                
           
                  document.getElementById('vehicleForm').addEventListener('submit', function(event) {
                    if (formSubmitted) {
                        event.preventDefault();
                        alert('Submit successful');
                        formSubmitted = false;
                    }
                  });
                });
          

                function makeFieldsReadOnly(isReadOnly) {
                    const inputs = document.querySelectorAll('input:not([name="COMMENTS"]), select');
                    inputs.forEach(input => {
                        input.readOnly = isReadOnly;
                        if (input.tagName === 'SELECT') {
                            input.style.pointerEvents = isReadOnly ? 'none' : 'auto';
                        }
                    });
                }

                function enableCommentsAndButtons() {
                    const allInputs = document.querySelectorAll('input, select, textarea');
                    allInputs.forEach(input => {
                        input.disabled = false;
                        if (input.name !== "COMMENTS") {
                            input.readOnly = true;
                        }
                    });

                    const commentsField = document.querySelector('textarea[name="COMMENTS"]');
                    if (commentsField) {
                        commentsField.readOnly = false;
                        commentsField.disabled = false;
                    }

                  // Enable file inputs and their associated elements
                  const fileInputs = document.querySelectorAll('input[type="file"]');
                  fileInputs.forEach(fileInput => {
                      fileInput.disabled = false;
                      fileInput.readOnly = false;

                      // Enable the file list container if it exists
                      const fileListContainer = fileInput.nextElementSibling;
                      if (fileListContainer && fileListContainer.classList.contains('file-list')) {
                          fileListContainer.style.pointerEvents = 'auto';
                          fileListContainer.style.opacity = '1';
                      }

                      // Enable the remove file icons if they exist
                      const removeIcons = fileInput.closest('td').querySelectorAll('.remove-file');
                      removeIcons.forEach(icon => {
                          icon.style.pointerEvents = 'auto';
                          icon.style.opacity = '1';
                      });
                  });

                  
                    const submitButton = document.querySelector('button#submitForm');
                    if (submitButton) {
                        submitButton.disabled = false;
                    }

                    const approverButtons = document.querySelectorAll('.approver-buttons button');
                    approverButtons.forEach(button => {
                        button.disabled = false;
                    });

                    isEditMode = true;
                }

               
                function updateSaveButtonVisibility(status) {
                  const saveButton = document.getElementById('saveform');
                  if (saveButton) {
                    saveButton.style.display = status === 'Draft' ? 'block' : 'none';
                  }
                }
                const tablesToDisable = ['insuranceTable', 'registrationTable', 'gpsTable', 'permitsTable', 'fuelTable', 'roadtollTable', 'driverTable', 'allocationTable'];

               

                    //edit button handlings

                    let isEditMode = false;

                    function disableAllFields() {
                      updateEditButtonState(document.querySelector('[name="STATUS"]').value);
                      const inputs = document.querySelectorAll('input, select, textarea');
                      inputs.forEach(input => {
                        input.disabled = true;
                      });
                      const commentsField = document.querySelector('textarea[name="COMMENTS"]');
                      if (commentsField) {
                          commentsField.disabled = false;
                      }

                      const permitColorInputs = document.querySelectorAll('.permit-colour-cell input[name="PermitColor"]');
                      permitColorInputs.forEach(input => {
                        input.disabled = true;
                      });


                      const buttons = document.querySelectorAll('button');
                      buttons.forEach(button => {
                        if (button.id !== 'editButton' && button.id !== 'newForm') {
                          button.disabled = true;
                        }
                      });

                      const removeIcons = document.querySelectorAll('.remove-file');
                      removeIcons.forEach(icon => {
                        icon.style.pointerEvents = 'none';
                        icon.style.opacity = '0.5';
                      });

                      isEditMode = false;
                    }

                    function disableEditingControls() {
                      document.getElementById('addRow').disabled = true;
                      document.getElementById('removeRow').disabled = true;
                      document.getElementById('submitForm').disabled = true;
                    }

                    function enableEditingControls() {
                      document.getElementById('addRow').disabled = false;
                      document.getElementById('removeRow').disabled = false;
                      document.getElementById('submitForm').disabled = false;
                    }

                    function showEditButton() {
                      document.getElementById('editButton').style.display = 'block';
                    }

                    function hideEditButton() {
                      document.getElementById('editButton').style.display = 'none';
                    }


                    function disableEditingControls() {
                      document.getElementById('addRow').disabled = true;
                      document.getElementById('removeRow').disabled = true;
                      document.getElementById('submitForm').disabled = true;
                    }

                    function enableEditingControls() {
                      document.getElementById('addRow').disabled = false;
                      document.getElementById('removeRow').disabled = false;
                      document.getElementById('submitForm').disabled = false;
                    }

                    function showEditButton() {
                      document.getElementById('editButton').style.display = 'block';
                    }

                    function hideEditButton() {
                      document.getElementById('editButton').style.display = 'none';
                    }

                    let isPopulatedData = false;

                    function enableAllFields() {
                      const inputs = document.querySelectorAll('input, select, textarea');
                      inputs.forEach(input => {
                        input.disabled = false;
                      });

                      const buttons = document.querySelectorAll('button');
                      buttons.forEach(button => {
                        button.disabled = false;
                      });

                      const removeIcons = document.querySelectorAll('.remove-file');
                      removeIcons.forEach(icon => {
                        icon.style.pointerEvents = 'auto';
                        icon.style.opacity = '1';
                      });

                      isEditMode = true;
                    }
                    function disableSpecificFields() {
                      const fieldsToDisable = ['FLEET_CONTROL_NO', 'FLEET_CREATION_DATE', 'STATUS'];
                      fieldsToDisable.forEach(fieldName => {
                        const field = document.querySelector(`[name="${fieldName}"]`);
                        if (field) {
                          field.disabled = true;
                          field.readOnly = true;
                          
                          if (fieldName === 'FLEET_CREATION_DATE') {
                            field.style.pointerEvents = 'none';
                            field.style.backgroundColor = '#e9ecef'; // Light gray background to indicate it's disabled
                            
                            // Remove the calendar icon if it's added via CSS
                            field.style.backgroundImage = 'none';
                            
                            // If there's a separate calendar button, disable it
                            const calendarButton = field.nextElementSibling;
                            if (calendarButton && calendarButton.tagName === 'BUTTON') {
                              calendarButton.disabled = true;
                              calendarButton.style.display = 'none';
                            }
                          }
                          
                          console.log(`Field ${fieldName} disabled successfully`);
                        } else {
                          console.log(`Field ${fieldName} not found`);
                        }
                      });
                    }
                    const editButton = document.getElementById('editButton');
                    if (editButton) {
                      editButton.addEventListener('click', function() {

                        const fromApprover = new URLSearchParams(window.location.search).get('from_approver') === 'true';
                        if (fromApprover) {
                            enableCommentsAndButtons();
                        } else {
                            enableAllFields();
                          disableSpecificFields();
                        }
                        enableEditingControls();
                        this.style.display = 'none';
                      });
                    }

                  


                    function navigateToAllActionHistory() {
                      var fleetNumberElement = document.querySelector('[name="FLEET_CONTROL_NO"]');
                      var headerIdElement = document.querySelector('#HEADER_ID');
                      var fleetControlNo = document.querySelector('[name="FLEET_CONTROL_NO"]');
                      
                      var fleetNumber = fleetNumberElement ? fleetNumberElement.value : '';
                      var headerId = headerIdElement ? headerIdElement.value : '';
                      var controlNo = fleetControlNo ? fleetControlNo.value : '';
                  
                      // Check if fleet control number exists
                      if (!controlNo || controlNo.trim() === '') {
                          alert('Please ensure Fleet Control Number is generated before viewing action history.');
                          return;
                      }
                  
                      // Store the state and navigate
                      sessionStorage.setItem('fleetMasterState', JSON.stringify({
                          fleetNumber: controlNo,
                          headerId: headerId
                      }));
                      
                      var originPage = sessionStorage.getItem('originPage');
                      
                      var url = "{% url 'action_history' %}";
                      window.location.href = url;
                  }
    
                    function navigateToAllAttachments() {
                      var fleetNumberElement = document.querySelector('[name="FLEET_CONTROL_NO"]');
                      var headerIdElement = document.querySelector('#HEADER_ID');
                      var fleetNumber = fleetNumberElement ? fleetNumberElement.value : '';
                      var headerId = headerIdElement ? headerIdElement.value : '';
    
                      // Store both values in sessionStorage
                      sessionStorage.setItem('fleetMasterState', JSON.stringify({
                          fleetNumber: fleetNumber,
                          headerId: headerId
                      }));
                      var originPage = sessionStorage.getItem('originPage');
        
    
                      var url = "{% url 'all_attachment' %}";
                      //url += "?fleet_number=" + encodeURIComponent(fleetNumber) + "&header_id=" + encodeURIComponent(headerId);
                      url += "?fleet_number=" + encodeURIComponent(fleetNumber) + "&HEADER_ID=" + encodeURIComponent(headerId) + "&from_approver=" + (originPage === 'approver');
        
                      window.location.href = url;
                    }
    
                    // Add this function to restore the state when the page loads
                    function restoreFleetMasterState() {
                      var storedState = sessionStorage.getItem('fleetMasterState');
                      if (storedState) {
                        var state = JSON.parse(storedState);
                        if (state.headerId) {
                          document.querySelector('#HEADER_ID').value = state.headerId;
                          populateFormFields(state.headerId, false);
                        } else if (state.fleetNumber) {
                          document.querySelector('[name="FLEET_CONTROL_NO"]').value = state.fleetNumber;
                          populateFormFields(state.fleetNumber, true);
                        }
                        sessionStorage.removeItem('fleetMasterState');
                      }
                    }


                    function setupDropdowns() {
                      document.querySelectorAll("select").forEach((dropdown) => {
                          const lookupName = dropdown.getAttribute("name").replace('_LOOKUP_NAME', '').trim();
                          if (lookupName) {
                              dropdown.addEventListener("click", () => fetchDropdownOptions(lookupName, dropdown));
                          }
                          dropdown.addEventListener("change", function () {
                              this.setAttribute("data-selected", this.value);
                          });
                      });
                    }

                    async function fetchDropdownOptions(lookupName, dropdown, selectedValue) {
                        try {
                            const response = await fetch(`/api/dropdown-options/?lookup_name=${lookupName}`);
                            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                            const data = await response.json();
                            populateDropdown(dropdown, data.meanings, selectedValue);
                        } catch (error) {
                            console.error("Error fetching dropdown options:", error);
                        }
                    }

                    function populateDropdown(dropdown, options, selectedValue) {
                        let existingOptions = Array.from(dropdown.options).map(option => option.value);

                        options.forEach((option) => {
                            if (!existingOptions.includes(option)) {
                                const opt = document.createElement("option");
                                opt.value = option;
                                opt.textContent = option;
                                dropdown.appendChild(opt);
                            }
                        });

                        if (selectedValue) {
                            dropdown.value = selectedValue;
                        }
                    }


                    function setDropdownValue(dropdown, value) {
                      if (!dropdown || !dropdown.options) {
                          console.log(`Dropdown or options not available for value: ${value}`);
                          return;
                      }
                  
                      let options = Array.from(dropdown.options || []);
                      let optionExists = options.some(option => option.value === value);
                  
                      if (!optionExists && value) {
                          let newOption = new Option(value, value);
                          dropdown.add(newOption);
                      }
                  
                      if (value) {
                          dropdown.value = value;
                          dropdown.dispatchEvent(new Event('change'));
                          console.log(`Set ${dropdown.name} to ${value}`);
                      } else {
                          console.log(`No value provided for ${dropdown.name}`);
                      }
                  }
                  
                      //tabs
                      function initializeTabs() {
                          document.querySelectorAll('.tab').forEach(tab => {
                              tab.addEventListener('click', () => {
                                    document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
                                    tab.classList.add('active');
                                    const contentId = tab.dataset.tab;
                                    const content = document.getElementById(contentId);
                                    if (content) {
                                        content.classList.add('active');
                                    } else {
                                        console.error(`Tab content not found for id: ${contentId}`);
                                    }
                                });
                          });
                      }
                      function loadContent(page) {
                        const contentDiv = document.querySelector('.height-100');
                        fetch(page)
                            .then(response => response.text())
                            .then(html => {
                                contentDiv.innerHTML = html;
                                initializeTabs();
                            })
                            .catch(error => {
                                console.error('Error loading content:', error);
                                contentDiv.innerHTML = '<p>Error loading content.</p>';
                            });
                      }


                      initializeTabs();
                      clearForm();

                        //search handlings
                        const searchInput = document.getElementById('searchInput');
                        const searchResultsContainer = document.querySelector('.search-results-container');
                        const searchResults = document.querySelector('.search-results tbody');
                        const closeIcon = document.querySelector('.close-icon');

                        let fleetInfo = []; // Store the fetched data

                        searchInput.addEventListener('focus', fetchAndPopulateSearchResults);
                        searchInput.addEventListener('click', fetchAndPopulateSearchResults);
                        searchInput.addEventListener('input', fetchAndPopulateSearchResults);
                        searchInput.addEventListener('keydown', function(event) {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            const firstResult = searchResults.querySelector('tr');
                            if (firstResult) {
                              const selectedFleetNumber = firstResult.firstElementChild.textContent;
                              searchInput.value = selectedFleetNumber;
                              hideSearchResults();
                              populateFormFields(selectedFleetNumber);
                            }
                          }
                        });


                        async function fetchFleetInfo() {
                          if (fleetInfo.length === 0) {
                            const response = await fetch('http://127.0.0.1:8000/api/fleet-info');
                            if (!response.ok) {
                              throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            fleetInfo = await response.json();
                            console.log('Fetched fleet info:', fleetInfo);
                          }
                          return fleetInfo;
                        }

                        function filterAndDisplayResults() {
                          const searchTerm = searchInput.value.toLowerCase();
                          const filteredInfo = fleetInfo.filter(info => {
                            const searchableFields = [
                              info.HEADER_ID,
                              info.FLEET_CONTROL_NO,
                              info.VIN_NO,
                              info.MANUFACTURER,
                              info.MODEL,
                              info.ENGINE_NO,
                              info.STATUS,
                              info.REGISTRATION_NO
                            ].map(field => (field || '').toLowerCase());

                            return searchableFields.some(field => field.includes(searchTerm));
                          });

                          console.log('Filtered info:', filteredInfo);

                          searchResults.innerHTML = '';
                          filteredInfo.forEach((info) => {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                              <td>${info.HEADER_ID}</td>

                              <td>${info.FLEET_CONTROL_NO}</td>
                              <td>${info.VIN_NO}</td>
                              <td>${info.MANUFACTURER}</td>
                              <td>${info.MODEL}</td>
                              <td>${info.ENGINE_NO}</td>
                              <td>${info.STATUS}</td>
                              <td>${info.REGISTRATION_NO}</td>
                            `;

                            tr.addEventListener('click', function (e) {
                              e.stopPropagation();
                              searchInput.value = info.FLEET_CONTROL_NO;
                              hideSearchResults();
                              populateFormFields(info.FLEET_CONTROL_NO);
                            });
                            searchResults.appendChild(tr);

                            tr.addEventListener('click', function (e) {
                              e.stopPropagation();
                              searchInput.value = info.HEADER_ID;
                              hideSearchResults();
                              populateFormFields(info.HEADER_ID, true);
                            });
                            searchResults.appendChild(tr);
                          });

                        }


                        function hideCancelButton() {
                          const cancelButton = document.querySelector('#cancelForm');
                          if (cancelButton) {
                              cancelButton.style.display = 'none';
                          }
                        }




                        async function fetchAndPopulateSearchResults(event) {
                          event.stopPropagation();
                          try {
                            await fetchFleetInfo();
                            filterAndDisplayResults();
                            showSearchResults();
                          } catch (error) {
                            console.error('Error fetching fleet info:', error);
                          }
                        }

                        function showSearchResults() {
                          searchResultsContainer.style.display = 'block';
                        }

                        function hideSearchResults() {
                          searchResultsContainer.style.display = 'none';
                        }

                        closeIcon.addEventListener('click', function(e) {
                          e.stopPropagation();
                          hideSearchResults();
                        });

                        document.addEventListener('click', function(event) {
                          if (!event.target.closest('.search-container')) {
                            hideSearchResults();
                          }
                        });

                        searchResults.addEventListener("click", function (e) {
                          if (e.target.tagName === "TD") {
                            const selectedFleetNumber = e.target.parentElement.firstElementChild.textContent;
                            searchInput.value = selectedFleetNumber;
                            hideSearchResults();
                            populateFormFields(selectedFleetNumber);
                          }
                        });

                        searchResults.addEventListener("click", function (e) {
                          if (e.target.tagName === "LI") {
                            const selectedFleetNumber = e.target.textContent;
                            searchInput.value = selectedFleetNumber;
                            searchResults.style.display = "none";
                            populateFormFields(selectedFleetNumber);
                          }
                        });


                        // Assuming populateFormFields function is defined elsewhere
                        function populateFormFields(headerId) {
                          // Implementation of populating form fields
                          console.log('Populating form fields for:', fleetControlNumber);
                        }
                        function updateSaveButtonVisibility(status) {
                          const saveButton = document.getElementById('saveform');
                          if (saveButton) {
                            saveButton.style.display = status === 'Draft' ? 'block' : 'none';
                          }
                        }

                        function disablePopulatedFields() {
                          const inputs = document.querySelectorAll('input, select, textarea');
                          inputs.forEach(input => {
                            if (input.value !== '') {
                              input.disabled = true;
                            }
                          });

                          // Disable populated rows in tables
                          const tables = document.querySelectorAll('table');
                          tables.forEach(table => {
                            const rows = table.querySelectorAll('tbody tr');
                            rows.forEach(row => {
                              const inputs = row.querySelectorAll('input, select, textarea');
                              let isPopulated = false;
                              inputs.forEach(input => {
                                if (input.value !== '') {
                                  isPopulated = true;
                                }
                              });
                              if (isPopulated) {
                                inputs.forEach(input => {
                                  input.disabled = true;
                                });
                              }
                            });
                          });
                        }





                  
                        document.querySelector('#searchInput').addEventListener('change', function() {
                            const fleetNumber = this.value;
                            if (fleetNumber) {
                                populateFormFields(fleetNumber);
                                // The afterPopulateForm function will handle showing/hiding the cancel button
                            } else {
                                clearForm();
                                hideCancelButton(); // Hide cancel button when clearing the form
                            }
                        });

                        async function populateFormFields(identifier, isApproverPage = false) {
                          const urlParams = new URLSearchParams(window.location.search);
                          const fromApprover = urlParams.get('from_approver') === 'true';
                          
                          
                          console.log("URL from_approver parameter:", fromApprover);
                          console.log("isApproverPage parameter:", isApproverPage);

                            clearCachedData();
                          
                            try {
                              const url =
                                `http://127.0.0.1:8000/api/fleet-master/${identifier}`;
                               

                              const response = await fetch(url);

                              if (!response.ok) {
                                if (response.status === 404) {
                                  console.error(`Fleet master with ${isApproverPage ? 'fleet control number' : 'header ID'} ${identifier} not found`);
                                  // Handle the 404 error (e.g., show a message to the user)
                                } else {
                                  throw new Error(`HTTP error! status: ${response.status}`);
                                }
                              } else {
                                const data = await response.json();
                                console.log("Fetched fleet data:", data);
                                
                                  updateSaveButtonVisibility(data.STATUS);
                                  
                                  // Handle read-only state for approver flow
                                  const isFromApprover = sessionStorage.getItem('fromApproverFlow') === 'true';
                                  const isReadOnly = sessionStorage.getItem('isReadOnly') === 'true';
                                  const isApprover = sessionStorage.getItem('isApprover') === 'true';
                                  const disableVehicleInfo = sessionStorage.getItem('disableVehicleInfo') === 'true';


                                  
                                  // Set background color for all disabled fields
                                  document.querySelectorAll('input:disabled, select:disabled, textarea:disabled').forEach(element => {
                                  // element.style.backgroundColor = '#ffff76';
                                    element.style.color = 'black'; // Ensure text remains visible
                                  });



                                  if (isFromApprover && isReadOnly) {
                                    // Disable all form fields except comments for approver
                                    const allInputs = document.querySelectorAll('input, select, textarea');
                                    allInputs.forEach(input => {
                                        // Enable comments field for approvers
                                        if (input.name === 'comments' || input.name === 'COMMENTS' || input.classList.contains('comments-field')) {
                                            input.disabled = false;
                                           // input.style.backgroundColor = '#ffff76';  // Set yellow background for comments field
                                        } else {
                                            input.disabled = true;
                                           // input.style.backgroundColor = '#e9ecef';
                                        }
                                    });

                                    
                                
                                    // Specifically enable comments fields in all sections
                                    const commentFields = document.querySelectorAll('[name*="comment"], [name*="COMMENT"]');
                                    commentFields.forEach(field => {
                                        field.disabled = false;
                                        field.style.backgroundColor = '#ffffff';  // Set yellow background
                                    });
                                
                                    // Enable the main comments textarea if it exists
                                    const mainComments = document.querySelector('#comments, #COMMENTS, .comments-field');
                                    if (mainComments) {
                                        mainComments.disabled = false;
                                       // mainComments.style.backgroundColor = '#ffff76';  // Set yellow background
                                    }
                                
                                      // Add background color setting after vehicle info section handling
                                      if (disableVehicleInfo) {
                                        const vehicleInfoInputs = document.querySelectorAll('#vehicleInfoSection input, #vehicleInfoSection select');
                                        vehicleInfoInputs.forEach(input => {
                                          if (!input.name.toLowerCase().includes('comment')) {
                                            input.disabled = true;
                                           // input.style.backgroundColor = '#ffff76';
                                          }
                                        });
                                      }
                                    }
          


                                  
                                if (isApproverPage) {

                                  const fleetControlNumberField = document.querySelector('[name="FLEET_CONTROL_NO"]');
                                  fleetControlNumberField.disabled = false;
                                  fleetControlNumberField.value = identifier;
                                } else {
                                  const headerIdField = document.querySelector('#HEADER_ID');
                                  if (headerIdField) {
                                    headerIdField.value = data.HEADER_ID;
                                  }
                                }


                                setTimeout(() => {
                                  setDropdownValue(document.querySelector('[name="COMPANY NAME_LOOKUP_NAME"]'), data.COMPANY_NAME);
                                  setDropdownValue(document.querySelector('[name="MANUFACTURER_LOOKUP_NAME"]'), data.MANUFACTURER);
                                  setDropdownValue(document.querySelector('[name="MODEL_LOOKUP_NAME"]'), data.MODEL);
                                  setDropdownValue(document.querySelector('[name="VEHICLE TYPE_LOOKUP_NAME"]'), data.VEHICLE_TYPE);
                                  setDropdownValue(document.querySelector('[name="COLOR_LOOKUP_NAME"]'), data.COLOR);
                                  setDropdownValue(document.querySelector('[name="FLEET CATEGORY_LOOKUP_NAME"]'), data.FLEET_CATEGORY);
                                  setDropdownValue(document.querySelector('[name="FLEET SUB CATEGORY_LOOKUP_NAME"]'), data.FLEET_SUB_CATEGORY);
                                  setDropdownValue(document.querySelector('[name="VEHICLE USAGE_LOOKUP_NAME"]'), data.ApplicationUsage);
                                  setDropdownValue(document.querySelector('[name="MODEL YEAR_LOOKUP_NAME"]'), data.MODEL_YEAR);
                                  setDropdownValue(document.querySelector('[name="COUNTRY OR ORIGIN_LOOKUP_NAME"]'), data.COUNTRY_OF_ORIGIN);
                                  setDropdownValue(document.querySelector('[name="SEATING CAPACITY_LOOKUP_NAME"]'), data.SEATING_CAPACITY);
                                  setDropdownValue(document.querySelector('[name="TONNAGE_LOOKUP_NAME"]'), data.TONNAGE);

                                  // Add this line to set the Registered Company Name
                                  setDropdownValue(document.querySelector('[name="REG_COMPANY_NAME"]'), data.registration[0].REG_COMPANY_NAME);
                                  setDropdownValue(document.querySelector('[name=""]'), data.registration[0].REGISTERED_EMIRATES);
                                }, 100);


                                for (const [key, value] of Object.entries(data)) {
                                  if (key !== "insurances" && key !== "gps" && key !== "permits" && 
                                      key !== "registration" && key !== "fuel" && key !== "roadtoll" && 
                                      key !== "driver" && key !== "allocation" && key !== "COMMENTS") {
                                    const field = document.querySelector(`[name="${key}"]`);
                                    if (field && field.type !== "file") {
                                      field.value = value;
                                    }
                                  }
                                }

                                // Inside populateFormFields function, after the data is fetched
                                console.log("Fetched comments value:", data.COMMENTS);

                                // Before setting the comments value
                                // Clear the comments field explicitly
                                const commentsField = document.querySelector('textarea[name="COMMENTS"]');
                                if (commentsField) {
                                    commentsField.value = '';
                                    console.log("Comments field cleared:", commentsField.value);
                                }

                              


                                const vehiclePurchaseDocInput = document.querySelector('[name="VehiclePurchaseDoc"]');

                                if (vehiclePurchaseDocInput && data.VehiclePurchaseDoc) {
                                    // Check if container already exists
                                    const existingContainer = vehiclePurchaseDocInput.closest('.file-input-wrapper');
                                    if (!existingContainer) {
                                        // Create container elements
                                        const fileListContainer = document.createElement("div");
                                        fileListContainer.className = "file-list-container";

                                        // Create and set up wrapper
                                        const wrapper = document.createElement('div');
                                        wrapper.className = 'file-input-wrapper';
                                        vehiclePurchaseDocInput.parentNode.insertBefore(wrapper, vehiclePurchaseDocInput);
                                        wrapper.appendChild(vehiclePurchaseDocInput);
                                        wrapper.appendChild(fileListContainer);

                                        // Create and append dropdown
                                        const fileDropdown = createFileDropdown();
                                        fileListContainer.appendChild(fileDropdown);
                                        if (fromApprover) {
                                          fileInput.disabled = true;
                                          fileInput.style.backgroundColor = '#e9ecef';
                                          fileDropdown.style.pointerEvents = 'none';
                                          fileDropdown.style.opacity = '0.7';
                                          fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
                                      } else {
                                          fileInput.disabled = false;
                                          fileInput.style.backgroundColor = '';
                                          fileDropdown.style.pointerEvents = 'auto';
                                          fileDropdown.style.opacity = '1';
                                          fileDropdown.querySelector('.file-list').style.backgroundColor = '';
                                      }
                                    }

                                    // Get instance ID and populate files
                                    const instanceId = data.HEADER_ID || document.querySelector('[name="HEADER_ID"]')?.value;
                                    vehiclePurchaseDocInput.dataset.instanceId = instanceId;

                                    const fileDropdown = vehiclePurchaseDocInput.closest('.file-input-wrapper')?.querySelector('.file-dropdown');
                                    if (fileDropdown && data.VehiclePurchaseDoc) {
                                        const fileNames = getAllFileNames(data.VehiclePurchaseDoc, 'VEHICLE', instanceId);
                                        fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                    }
                                }

                            
                                const insuranceTable = document.querySelector("#insuranceTable tbody");
                                insuranceTable.innerHTML = "";
                                const hasApprovedInsuranceRow = data.insurances.some(insurance => insurance.FLEET_PROCESS === 'Approved');

                                if (Array.isArray(data.insurances)) {
                                  const sortedInsurances = data.insurances.sort((a, b) => {
                                    // First, prioritize 'Active' status
                                   if (a.CUR_STAT_MOT_INS === 'Active' && b.CUR_STAT_MOT_INS !== 'Active') return -1;
                                   if (b.CUR_STAT_MOT_INS === 'Active' && a.CUR_STAT_MOT_INS !== 'Active') return 1;
                                   
                                   // Then, consider 'Approved' status
                                   if (a.FLEET_PROCESS === 'Approved' && b.FLEET_PROCESS !== 'Approved') return -1;
                                   if (b.FLEET_PROCESS === 'Approved' && a.FLEET_PROCESS !== 'Approved') return 1;
                                   
                                   // If both have the same status, maintain their original order
                                   return 0;
                                   });
                           
                                   sortedInsurances.forEach((insurance) => {
                                     const row = insuranceTable.insertRow();
                                     row.dataset.process = insurance.FLEET_PROCESS;

                                      let inputClass = '';
                                      if (insurance.FLEET_PROCESS === 'Approved') {
                                        inputClass = 'approved-input';
                                      } else if (insurance.FLEET_PROCESS === 'Pending for Approval') {
                                        inputClass = 'pending-input';
                                      } else if (insurance.FLEET_PROCESS === 'Return for Correction') {
                                        inputClass = 'rectification-input';
                                      }
                                      const isDisabled = isFromApprover || isApproverPage || insurance.FLEET_PROCESS === 'Approved';
                                      row.innerHTML = `
                                        <td><input type="text" class="form-control   ${inputClass}" name="INSURANCE_COMPANY" value="${insurance.INSURANCE_COMPANY}" ${isDisabled ? 'disabled' : ''} style="background-color: #ffff76; color: black"/></td>
                                        <td><input type="text" class="form-control  ${inputClass}" name="POLICY_NO" value="${insurance.POLICY_NO}" ${isDisabled ? 'disabled' : ''} style="background-color: #ffff76; color: black"/></td>
                                        <td><input type="date" class="form-control  ${inputClass}" name="POLICY_DATE" value="${insurance.POLICY_DATE}" ${isDisabled ? 'disabled' : ''} style="background-color: #ffff76; color: black"/></td>
                                        <td><input type="date" class="form-control  ${inputClass}" name="POLICY_EXPIRY_DATE" value="${insurance.POLICY_EXPIRY_DATE}" ${isDisabled ? 'disabled' : ''} style="background-color: #ffff76; color: black"/></td>
                                        <td><input type="date" class="form-control  ${inputClass}" name="PLTS_INS_START_DATE" value="${insurance.PLTS_INS_START_DATE}" ${isDisabled ? 'disabled' : ''} style="background-color: #ffff76; color: black"/></td>
                                        <td><input type="date" class="form-control  ${inputClass}" name="PLTS_INS_EXPIRY_DATE" value="${insurance.PLTS_INS_EXPIRY_DATE}" ${isDisabled ? 'disabled' : ''} style="background-color: #ffff76; color: black"/></td>
                                        <td><select class="form-control ${inputClass}" name="CURRENT STATUS_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''} style="background-color: #ffff76; color: black"><option value=""></option></select></td>
                                        <td><input type="file" class="form-control ${inputClass}" name="InsurancePolicAattachment" ${isDisabled ? 'disabled' : ''}/></td>
                                        <input type="hidden" name="insurance_id" value="${insurance.INS_LINE_ID}" />
                                        <input type="hidden" name="FLEET_PROCESS" value="${insurance.FLEET_PROCESS}" />
                                      `;

                                      setupDropdownsForNewRow(row);
                                          setupInsuranceFleetSearchFunctionality(row);

                                      setTimeout(() => {
                                        setDropdownValue(row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]'), insurance.CUR_STAT_MOT_INS);
                                      }, 0);
                                        
                                      
                                      const fileInput = row.querySelector('input[type="file"]');
                                      const fileListContainer = document.createElement("div");
                                      fileListContainer.className = "file-list-container";

                                      // Wrap the file input and dropdown in a container
                                      const wrapper = document.createElement('div');
                                      wrapper.className = 'file-input-wrapper';
                                      fileInput.parentNode.insertBefore(wrapper, fileInput);
                                      wrapper.appendChild(fileInput);
                                      wrapper.appendChild(fileListContainer);

                                      const fileDropdown = createFileDropdown();
                                      fileListContainer.appendChild(fileDropdown);
                                      if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                      if (insurance.InsurancePolicAattachment) {
                                        const fileNames = getAllFileNames(insurance.InsurancePolicAattachment, 'insurance', insurance.INS_LINE_ID);
                                        fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                      }

                                      updateFileCount(fileInput, fileDropdown);
                                      addFileInputListeners();

                                      // setupInsuranceSearchFunctionality(row);
                                        });
                                }

                           



                                const registrationTable = document.querySelector("#registrationTable tbody");
                                registrationTable.innerHTML = "";
                                const hasApprovedRegistrationRow = data.registration.some(registration => registration.FLEET_PROCESS === 'Approved');

                                if (Array.isArray(data.registration)) {
                                  const sortedRegistraions = data.registration.sort((a, b) => {
                                    // First, prioritize 'Active' status
                                    if (a.CUR_STAT_PERMIT === 'Active' && b.CUR_STAT_REG !== 'Active') return -1;
                                    if (b.CUR_STAT_PERMIT === 'Active' && a.CUR_STAT_REG !== 'Active') return 1;
                                    
                                    // Then, consider 'Approved' status
                                    if (a.FLEET_PROCESS === 'Approved' && b.FLEET_PROCESS !== 'Approved') return -1;
                                    if (b.FLEET_PROCESS === 'Approved' && a.FLEET_PROCESS !== 'Approved') return 1;
                                    
                                    // If both have the same status, maintain their original order
                                    return 0;
                                  });
                                
                                  sortedRegistraions.forEach((registration) => {
                                    const row = registrationTable.insertRow();
                                    row.dataset.process = registration.FLEET_PROCESS;
                                    
                                    let inputClass = '';
                                    if (registration.FLEET_PROCESS === 'Approved') {
                                      inputClass = 'approved-input';
                                    } else if (registration.FLEET_PROCESS === 'Pending for Approval') {
                                      inputClass = 'pending-input';
                                    } else if (registration.FLEET_PROCESS === 'Return for Correction') {
                                      inputClass = 'rectification-input';
                                    }

                                    const isDisabled = isFromApprover || isApproverPage || registration.FLEET_PROCESS === 'Approved';

                                    row.innerHTML = `
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="EMIRATES_TRF_FILE_NO" value="${registration.EMIRATES_TRF_FILE_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="REGISTERED_EMIRATES" value="${registration.REGISTERED_EMIRATES || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="FEDERAL_TRF_FILE_NO" value="${registration.FEDERAL_TRF_FILE_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control ${inputClass}" style="background-color: #ffff76; color: black" name="REG_COMPANY_NAME" value="${registration.REG_COMPANY_NAME || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control ${inputClass}" style="background-color: #ffff76; color: black" name="TRADE_LICENSE_NO" value="${registration.TRADE_LICENSE_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black"  name="REGISTRATION_NO1" value="${registration.REGISTRATION_NO1 || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="REGISTRATION_NO" value="${registration.REGISTRATION_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="REGISTRATION_DATE" value="${registration.REGISTRATION_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="REG_EXPIRY_DATE" value="${registration.REG_EXPIRY_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><select class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="CURRENT STATUS_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><input type="file" class="form-control ${inputClass}" name="RegCardAttachment" multiple ${isDisabled ? 'disabled' : ''}/></td>
                                      <input type="hidden" name="registration_id" value="${registration.REG_LINE_ID}" />
                                      <input type="hidden" name="FLEET_PROCESS" value="${registration.FLEET_PROCESS}" />
                                    `;

                                    setupRegistrationSearchFunctionality(row);
                                    setupDropdownsForNewRow(row);

                                    setTimeout(() => {
                                      setDropdownValue(row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]'), registration.CUR_STAT_REG);
                                    }, 0);

                                    const fileInput = row.querySelector('input[type="file"]');
                                    const fileListContainer = document.createElement("div");
                                    fileListContainer.className = "file-list-container";

                                    const wrapper = document.createElement('div');
                                    wrapper.className = 'file-input-wrapper';
                                    fileInput.parentNode.insertBefore(wrapper, fileInput);
                                    wrapper.appendChild(fileInput);
                                    wrapper.appendChild(fileListContainer);

                                    const fileDropdown = createFileDropdown();
                                    fileListContainer.appendChild(fileDropdown);

                                    if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                    if (registration.RegCardAttachment) {
                                      const fileNames = getAllFileNames(registration.RegCardAttachment, 'registration', registration.REG_LINE_ID);
                                      fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                    }

                                    updateFileCount(fileInput, fileDropdown);
                                    addFileInputListeners();

                                    // Set up traffic search functionality for this row
                                    setupTrafficSearchFunctionality(row);
                                  });
                                }


                                const fuelTable = document.querySelector("#fuelTable tbody");
                                fuelTable.innerHTML = "";
                                const hasApprovedFuelRow = data.fuel.some(fuel => fuel.FLEET_PROCESS === 'Approved');

                                
                                if (Array.isArray(data.fuel)) {
                                  const sortedFuel= data.fuel.sort((a, b) => {
                                    // First, prioritize 'Active' status
                                    if (a.CUR_STAT_PERMIT === 'Active' && b.CUR_STAT_FUEL_DOC !== 'Active') return -1;
                                    if (b.CUR_STAT_PERMIT === 'Active' && a.CUR_STAT_FUEL_DOC !== 'Active') return 1;
                                    
                                    // Then, consider 'Approved' status
                                    if (a.FLEET_PROCESS === 'Approved' && b.FLEET_PROCESS !== 'Approved') return -1;
                                    if (b.FLEET_PROCESS === 'Approved' && a.FLEET_PROCESS !== 'Approved') return 1;
                                    
                                    // If both have the same status, maintain their original order
                                    return 0;
                                  });
                                
                                  sortedFuel.forEach((fuel) => {
                                    const row = fuelTable.insertRow();
                                    row.dataset.process = fuel.FLEET_PROCESS;
                                    
                                    
                                    
                                        let inputClass = '';

                                        if (fuel.FLEET_PROCESS === 'Approved') {
                                          inputClass = 'approved-input';
                                        } else if (fuel.FLEET_PROCESS === 'Pending for Approval') {
                                          inputClass = 'pending-input';
                                        } else if (fuel.FLEET_PROCESS === 'Return for Correction') {
                                          inputClass = 'rectification-input';
                                        }

                                        
                                      const isDisabled = isFromApprover || isApproverPage || fuel.FLEET_PROCESS === 'Approved';
              
                                        row.innerHTML = `
                                          <td><select class="form-control ${inputClass}" name="FUEL TYPE_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                          <td><input type="text" class="${inputClass} form-control" name="MONTHLY_FUEL_LIMIT" value="${fuel.MONTHLY_FUEL_LIMIT || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                          <td><select class=" ${inputClass} form-control" name="FUEL SERVICE TYPE_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                          <td><select class=" ${inputClass} form-control" name="FUEL SERVICE PROVIDER_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                          <td><input type="text" class=" ${inputClass} form-control" name="FUEL_DOCUMENT_NO" value="${fuel.FUEL_DOCUMENT_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                          <td><input type="date" class="${inputClass} form-control" name="FUEL_DOCUMENT_DATE" value="${fuel.FUEL_DOCUMENT_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                          <td><input type="date" class="${inputClass} form-control" name="FUEL_DOC_EXPIRY_DATE" value="${fuel.FUEL_DOC_EXPIRY_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                          <td><select class="form-control ${inputClass}" name="CURRENT STATUS_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                          <td><input type="file" class="form-control ${inputClass}" name="FuelDocumentAttachment" multiple ${isDisabled ? 'disabled' : ''}/></td>
                                          <input type="hidden" name="fuel_id" value="${fuel.FUEL_LINE_ID || ""}" />
                                          <input type="hidden" name="FLEET_PROCESS" value="${fuel.FLEET_PROCESS}" />
                                        `;

                                        setupDropdownsForNewRow(row);

                                        setTimeout(() => {
                                          setDropdownValue(row.querySelector('select[name="FUEL TYPE_LOOKUP_NAME"]'), fuel.FUEL_TYPE);
                                          setDropdownValue(row.querySelector('select[name="FUEL SERVICE TYPE_LOOKUP_NAME"]'), fuel.FUEL_SERVICE_TYPE);
                                          setDropdownValue(row.querySelector('select[name="FUEL SERVICE PROVIDER_LOOKUP_NAME"]'), fuel.FUEL_SERVICE_PROVIDER);
                                          setDropdownValue(row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]'), fuel.CUR_STAT_FUEL_DOC);
                                        }, 0);

                                        const fileInput = row.querySelector('input[type="file"]');
                                        const fileListContainer = document.createElement("div");
                                          fileListContainer.className = "file-list-container";

                                          // Wrap the file input and dropdown in a container
                                          const wrapper = document.createElement('div');
                                          wrapper.className = 'file-input-wrapper';
                                          fileInput.parentNode.insertBefore(wrapper, fileInput);
                                          wrapper.appendChild(fileInput);
                                          wrapper.appendChild(fileListContainer);

                                          const fileDropdown = createFileDropdown();
                                          fileListContainer.appendChild(fileDropdown);

                                          if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                        if (fuel.FuelDocumentAttachment) {
                                            const fileNames = getAllFileNames(fuel.FuelDocumentAttachment, 'fuel', fuel.FUEL_LINE_ID);
                                            fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                        }

                                          updateFileCount(fileInput, fileDropdown);
                                        addFileInputListeners();
                                      });
                                }


                                const roadtollTable = document.querySelector("#roadtollTable tbody");
                                roadtollTable.innerHTML = "";
                                const hasApprovedRoadtollRow = data.roadtoll.some(roadtoll => roadtoll.FLEET_PROCESS === 'Approved');

                                if (Array.isArray(data.roadtoll)) {
                                 
                                  const sortedRoadtolls = data.roadtoll.sort((a, b) => {
                                    // First, prioritize 'Active' status
                                    if (a.CUR_STAT_PERMIT === 'Active' && b.CURRENT_STATUS !== 'Active') return -1;
                                    if (b.CUR_STAT_PERMIT === 'Active' && a.CURRENT_STATUS !== 'Active') return 1;
                                    
                                    // Then, consider 'Approved' status
                                    if (a.FLEET_PROCESS === 'Approved' && b.FLEET_PROCESS !== 'Approved') return -1;
                                    if (b.FLEET_PROCESS === 'Approved' && a.FLEET_PROCESS !== 'Approved') return 1;
                                    
                                    // If both have the same status, maintain their original order
                                    return 0;
                                  });
                                
                                  sortedRoadtolls.forEach((roadtoll) => {
                                    const row = roadtollTable.insertRow();
                                    row.dataset.process = roadtoll.FLEET_PROCESS;
                                    let inputClass = '';

                                    if (roadtoll.FLEET_PROCESS === 'Approved') {
                                      inputClass = 'approved-input';
                                    } else if (roadtoll.FLEET_PROCESS === 'Pending for Approval') {
                                      inputClass = 'pending-input';
                                    } else if (roadtoll.FLEET_PROCESS === 'Return for Correction') {
                                      inputClass = 'rectification-input';
                                    }
                                    const isDisabled = isFromApprover || isApproverPage || roadtoll.FLEET_PROCESS === 'Approved';

                                    row.innerHTML = `
                                      <td><select class="form-control ${inputClass}" name="AE_EMIRATES_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><select class="form-control ${inputClass}" name="TOLL TYPE_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><input type="number" class="form-control ${inputClass}" name="ACCOUNT_NO" value="${roadtoll.ACCOUNT_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="number" class="form-control ${inputClass}" name="TAG_NO" value="${roadtoll.TAG_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="ACTIVATION_DATE" value="${roadtoll.ACTIVATION_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="ACTIVATION_END_DATE" value="${roadtoll.ACTIVATION_END_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      
                                      <td><select class="form-control ${inputClass}" name="CURRENT STATUS_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><input type="file" class="form-control ${inputClass}" name="RoadtollAttachments" multiple ${isDisabled ? 'disabled' : ''}/></td>
                                      <input type="hidden" name="roadtoll_id" value="${roadtoll.RT_LINE_ID || ""}" />
                                      <input type="hidden" name="FLEET_PROCESS" value="${roadtoll.FLEET_PROCESS}" />
                                    `;

                                    setupDropdownsForNewRow(row);

                                    setTimeout(() => {
                                      setDropdownValue(row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]'), roadtoll.EMIRATES);
                                      setDropdownValue(row.querySelector('select[name="TOLL TYPE_LOOKUP_NAME"]'), roadtoll.TOLL_TYPE);
                                      setDropdownValue(row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]'), roadtoll.CURRENT_STATUS);
                                    }, 0);

                                    const fileInput = row.querySelector('input[type="file"]');
                                    const fileListContainer = document.createElement("div");
                                      fileListContainer.className = "file-list-container";

                                      // Wrap the file input and dropdown in a container
                                      const wrapper = document.createElement('div');
                                      wrapper.className = 'file-input-wrapper';
                                      fileInput.parentNode.insertBefore(wrapper, fileInput);
                                      wrapper.appendChild(fileInput);
                                      wrapper.appendChild(fileListContainer);

                                      const fileDropdown = createFileDropdown();
                                      fileListContainer.appendChild(fileDropdown);

                                      if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                    if (roadtoll.RoadtollAttachments) {
                                        const fileNames = getAllFileNames(roadtoll.RoadtollAttachments, 'roadtoll', roadtoll.RT_LINE_ID);
                                        fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                    }

                                      updateFileCount(fileInput, fileDropdown);
                                    addFileInputListeners();
                                  });
                                }

                                const permitsTable = document.querySelector("#permitsTable tbody");
                                permitsTable.innerHTML = "";
                                const hasApprovedPermitRow = data.permits.some(permit => permit.FLEET_PROCESS === 'Approved');

                                if (Array.isArray(data.permits)) {
                                  const sortedPermits = data.permits.sort((a, b) => {
                                    // First, prioritize 'Active' status
                                    if (a.CUR_STAT_PERMIT === 'Active' && b.CUR_STAT_PERMIT !== 'Active') return -1;
                                    if (b.CUR_STAT_PERMIT === 'Active' && a.CUR_STAT_PERMIT !== 'Active') return 1;
                                    
                                    // Then, consider 'Approved' status
                                    if (a.FLEET_PROCESS === 'Approved' && b.FLEET_PROCESS !== 'Approved') return -1;
                                    if (b.FLEET_PROCESS === 'Approved' && a.FLEET_PROCESS !== 'Approved') return 1;
                                    
                                    // If both have the same status, maintain their original order
                                    return 0;
                                  });
                                
                                  sortedPermits.forEach((permit) => {
                                    const row = permitsTable.insertRow();
                                    row.dataset.process = permit.FLEET_PROCESS;
                                    let inputClass = '';
                                    // Set row color based on process
                                    if (permit.FLEET_PROCESS === 'Approved') {
                                      inputClass = 'approved-input';
                                    } else if (permit.FLEET_PROCESS === 'Pending for Approval') {
                                      inputClass = 'pending-input';
                                    } else if (permit.FLEET_PROCESS === 'Return for Correction') {
                                      inputClass = 'rectification-input';
                                    }
                                   
                                    const isDisabled = isFromApprover || isApproverPage || permit.FLEET_PROCESS === 'Approved';

                                    row.innerHTML = `
                                      <td><select class="form-control ${inputClass}" name="PERMIT_LOOKUP_NAME" onchange="togglePermitColour(this)" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><select class="form-control ${inputClass}" name="AE_EMIRATES_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><select class="form-control ${inputClass}" name="ISSUING AUTHORITY_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><input type="text" class="form-control ${inputClass}" name="PERMIT_NO" value="${permit.PERMIT_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="PERMIT_DATE" value="${permit.PERMIT_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="PERMIT_EXPIRY_DATE" value="${permit.PERMIT_EXPIRY_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><select class="form-control ${inputClass}" name="CURRENT STATUS_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td class="permit-colour-cell ${inputClass}"></td>
                                      <td><input type="file" class="form-control ${inputClass}" name="PermitAattachment" multiple ${isDisabled ? 'disabled' : ''}/></td>
                                      <input type="hidden" name="permit_id" value="${permit.PERMIT_LINE_ID}" />
                                      <input type="hidden" name="FLEET_PROCESS" value="${permit.FLEET_PROCESS}" />
                                    `;

                                    setupDropdownsForNewRow(row);
                                    setTimeout(() => {
                                      setDropdownValue(row.querySelector('select[name="PERMIT_LOOKUP_NAME"]'), permit.PERMIT_TYPE);
                                      setDropdownValue(row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]'), permit.EMIRATES);
                                      setDropdownValue(row.querySelector('select[name="ISSUING AUTHORITY_LOOKUP_NAME"]'), permit.ISSUING_AUTHORITY);
                                      setDropdownValue(row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]'), permit.CUR_STAT_PERMIT);

                                      togglePermitColour(row.querySelector('select[name="PERMIT_LOOKUP_NAME"]'));

                                      const permitColorInput = row.querySelector('input[name="PermitColor"]');
                                      if (permitColorInput && permit.PermitColor) {
                                        permitColorInput.value = permit.PermitColor;
                                      }
                                    }, 0);

                                    const fileInput = row.querySelector('input[type="file"]');
                                    const fileListContainer = document.createElement("div");
                                      fileListContainer.className = "file-list-container";

                                      // Wrap the file input and dropdown in a container
                                      const wrapper = document.createElement('div');
                                      wrapper.className = 'file-input-wrapper';
                                      fileInput.parentNode.insertBefore(wrapper, fileInput);
                                      wrapper.appendChild(fileInput);
                                      wrapper.appendChild(fileListContainer);

                                      const fileDropdown = createFileDropdown();
                                      fileListContainer.appendChild(fileDropdown);

                                      if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                    if (permit.PermitAattachment) {
                                        const fileNames = getAllFileNames(permit.PermitAattachment, 'permits', permit.PERMIT_LINE_ID);
                                        fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                    }

                                      updateFileCount(fileInput, fileDropdown);
                                    addFileInputListeners();
                                  });
                                }


                                
                                const gpsTable = document.querySelector("#gpsTable tbody");
                                gpsTable.innerHTML = "";
                                const hasApprovedGpsRow = data.gps.some(gps => gps.FLEET_PROCESS === 'Approved');

                                if (Array.isArray(data.gps)) {
                                  data.gps.forEach((gps) => {
                                    const row = gpsTable.insertRow();
                                    row.dataset.process = gps.FLEET_PROCESS;
                                    let inputClass = '';

                                    if (gps.FLEET_PROCESS === 'Approved') {
                                      inputClass = 'approved-input';
                                    } else if (gps.FLEET_PROCESS === 'Pending for Approval') {
                                      inputClass = 'pending-input';
                                    } else if (gps.FLEET_PROCESS === 'Return for Correction') {
                                      inputClass = 'rectification-input';
                                    }

                                    const isDisabled = isFromApprover || isApproverPage || gps.FLEET_PROCESS === 'Approved';

                                    row.innerHTML = `
                                      <td><input type="text" class="form-control ${inputClass}" name="GPS_DEVICE_NO" value="${gps.GPS_DEVICE_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="GPS_INSTALLATION_DATE" value="${gps.GPS_INSTALLATION_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control ${inputClass}" name="GPS_SERVICE_PROVIDER" value="${gps.GPS_SERVICE_PROVIDER || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="file" class="form-control ${inputClass}" name="GpsAattachment" multiple ${isDisabled ? 'disabled' : ''}/></td>
                                      <input type="hidden" name="gps_id" value="${gps.GT_LINE_ID}" />
                                      <input type="hidden" name="FLEET_PROCESS" value="${gps.FLEET_PROCESS}" />
                                    `;

                                    const fileInput = row.querySelector('input[type="file"]');
                                    const fileListContainer = document.createElement("div");
                                      fileListContainer.className = "file-list-container";

                                      // Wrap the file input and dropdown in a container
                                      const wrapper = document.createElement('div');
                                      wrapper.className = 'file-input-wrapper';
                                      fileInput.parentNode.insertBefore(wrapper, fileInput);
                                      wrapper.appendChild(fileInput);
                                      wrapper.appendChild(fileListContainer);

                                      const fileDropdown = createFileDropdown();
                                      fileListContainer.appendChild(fileDropdown);

                                      if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                    if (gps.GpsAattachment) {
                                        const fileNames = getAllFileNames(gps.GpsAattachment, 'gps', gps.GT_LINE_ID);
                                        fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                    }

                                      updateFileCount(fileInput, fileDropdown);
                                    addFileInputListeners();
                                  });
                                }


                                const allocationTable = document.querySelector("#allocationTable tbody");
                                allocationTable.innerHTML = "";
                                const hasApprovedAllocationRow = data.allocation.some(allocation => allocation.FLEET_PROCESS === 'Approved');

                                if (Array.isArray(data.allocation)) {
                                  data.allocation.forEach((allocation) => {
                                    const row = allocationTable.insertRow();
                                    row.dataset.process = allocation.FLEET_PROCESS;
                                    let inputClass = '';

                                    if (allocation.FLEET_PROCESS === 'Approved') {
                                      inputClass = 'approved-input';
                                    } else if (allocation.FLEET_PROCESS === 'Pending for Approval') {
                                      inputClass = 'pending-input';
                                    } else if (allocation.FLEET_PROCESS === 'Return for Correction') {
                                      inputClass = 'rectification-input';
                                    }

                                    const isDisabled = isFromApprover || isApproverPage || allocation.FLEET_PROCESS === 'Approved';

                                    row.innerHTML = `
                                      <td><select class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="COMPANY NAME_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><select class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="DIVISIONS_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><select class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="OPERATING_LOCATION_ALLOCATION_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><select class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="AE_EMIRATES_LOOKUP_NAME" ${isDisabled ? 'disabled' : ''}><option value=""></option></select></td>
                                      <td><input type="date" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="ALLOCATION_DATE" value="${allocation.ALLOCATION_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="ALLOCATION_END_DATE" value="${allocation.ALLOCATION_END_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      
                                      <td><input type="file" class="form-control ${inputClass}" name="attachment" multiple ${isDisabled ? 'disabled' : ''}/></td>
                                      <input type="hidden" name="allocation_id" value="${allocation.ALLOC_LINE_ID|| ""}" />
                                      <input type="hidden" name="FLEET_PROCESS" value="${allocation.FLEET_PROCESS}" />
                                    `;


                                    setupDropdownsForNewRow(row);

                                    setTimeout(() => {
                                      setDropdownValue(row.querySelector('select[name="COMPANY NAME_LOOKUP_NAME"]'), allocation.COMPANY_NAME);
                                      setDropdownValue(row.querySelector('select[name="DIVISIONS_LOOKUP_NAME"]'), allocation.DIVISION);
                                      setDropdownValue(row.querySelector('select[name="OPERATING_LOCATION_ALLOCATION_LOOKUP_NAME"]'), allocation.OPERATING_LOCATION);
                                      setDropdownValue(row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]'), allocation.OPERATING_EMIRATES);
                                    }, 0);

                                    const fileInput = row.querySelector('input[type="file"]');
                                    const fileListContainer = document.createElement("div");
                                      fileListContainer.className = "file-list-container";

                                      // Wrap the file input and dropdown in a container
                                      const wrapper = document.createElement('div');
                                      wrapper.className = 'file-input-wrapper';
                                      fileInput.parentNode.insertBefore(wrapper, fileInput);
                                      wrapper.appendChild(fileInput);
                                      wrapper.appendChild(fileListContainer);

                                      const fileDropdown = createFileDropdown();
                                      fileListContainer.appendChild(fileDropdown);

                                      if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                    if (allocation.attachment) {
                                        const fileNames = getAllFileNames(allocation.attachment, 'allocation', allocation.ALLOC_LINE_ID);
                                        fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                    }

                                      updateFileCount(fileInput, fileDropdown);
                                    addFileInputListeners();
                                  });
                                }



                                const driverTable = document.querySelector("#driverTable tbody");
                                driverTable.innerHTML = "";
                                const hasApprovedDriverRow = data.driver.some(driver => driver.FLEET_PROCESS === 'Approved');

                                if (Array.isArray(data.driver)) {
                                  data.driver.forEach((driver) => {
                                    const row = driverTable.insertRow();
                                    row.dataset.process = driver.FLEET_PROCESS;
                                    let inputClass = '';

                                    if (driver.FLEET_PROCESS === 'Approved') {
                                      inputClass = 'approved-input';
                                    } else if (driver.FLEET_PROCESS === 'Pending for Approval') {
                                      inputClass = 'pending-input';
                                    } else if (driver.FLEET_PROCESS === 'Return for Correction') {
                                      inputClass = 'rectification-input';
                                    }

                                    const isDisabled = isFromApprover || isApproverPage || driver.FLEET_PROCESS === 'Approved';
          
                                    row.innerHTML = `
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="EMPLOYEE_NO" value="${driver.EMPLOYEE_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="EMPLOYEE_NAME" value="${driver.EMPLOYEE_NAME || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="DESIGNATION" value="${driver.DESIGNATION || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control  ${inputClass}" style="background-color: #ffff76; color: black" name="CONTACT_NUMBER" value="${driver.CONTACT_NUMBER || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" style="background-color: #ffff76; color: black" name="ASSIGNMENT_DATE" value="${driver.ASSIGNMENT_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      
                                      <td><input type="date" class="form-control ${inputClass}" style="background-color: #ffff76; color: black" name="ASSIGNMENT_END_DATE" value="${driver.ASSIGNMENT_END_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="number" class="form-control ${inputClass}" name="TRAFFIC_CODE_NO" value="${driver.TRAFFIC_CODE_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="number" class="form-control ${inputClass}" name="DRIVING_LICENSE_NO" value="${driver.DRIVING_LICENSE_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control ${inputClass}" name="LICENSE_TYPE" value="${driver.LICENSE_TYPE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="text" class="form-control ${inputClass}" name="PLACE_OF_ISSUE" value="${driver.PLACE_OF_ISSUE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="LICENSE_EXPIRY_DATE" value="${driver.LICENSE_EXPIRY_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="number" class="form-control ${inputClass}" name="GPS_TAG_NO" value="${driver.GPS_TAG_NO || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="date" class="form-control ${inputClass}" name="GPS_TAG_ASSIGN_DATE" value="${driver.GPS_TAG_ASSIGN_DATE || ""}" ${isDisabled ? 'disabled' : ''}/></td>
                                      <td><input type="file" class="form-control ${inputClass}" name="DriverAttachments" multiple ${isDisabled ? 'disabled' : ''}/></td>
                                      <input type="hidden" name="driver_id" value="${driver.ASGN_LINE_ID}" />
                                      <input type="hidden" name="FLEET_PROCESS" value="${driver.FLEET_PROCESS}" />
                                    `;
                                    setupDriverSearchFunctionality(row);

                                    const fileInput = row.querySelector('input[type="file"]');
                                    const fileListContainer = document.createElement("div");
                                      fileListContainer.className = "file-list-container";

                                      // Wrap the file input and dropdown in a container
                                      const wrapper = document.createElement('div');
                                      wrapper.className = 'file-input-wrapper';
                                      fileInput.parentNode.insertBefore(wrapper, fileInput);
                                      wrapper.appendChild(fileInput);
                                      wrapper.appendChild(fileListContainer);

                                      const fileDropdown = createFileDropdown();
                                      fileListContainer.appendChild(fileDropdown);

                                      if (fromApprover) {
        fileInput.disabled = true;
        fileInput.style.backgroundColor = '#e9ecef';
        fileDropdown.style.pointerEvents = 'none';
        fileDropdown.style.opacity = '0.7';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '#e9ecef';
    } else {
        fileInput.disabled = false;
        fileInput.style.backgroundColor = '';
        fileDropdown.style.pointerEvents = 'auto';
        fileDropdown.style.opacity = '1';
        fileDropdown.querySelector('.file-list').style.backgroundColor = '';
    }

                                    if (driver.DriverAttachments) {
                                        const fileNames = getAllFileNames(driver.DriverAttachments, 'driver', driver.ASGN_LINE_ID);
                                        fileDropdown.querySelector('.file-list').innerHTML = fileNames;
                                    }

                                      updateFileCount(fileInput, fileDropdown);
                                    addFileInputListeners();
                                  });
                                }



                                if (data.STATUS === 'Defleet') {
                                  freezeForm();
                                  updateEditButtonState(data.STATUS);
                                } else {
                                  setupDeleteListeners();
                                  disableAllFields();
                                  updateSaveButtonVisibility(data.STATUS);
                                  disableEditingControls();
                                  showEditButton();
                                  isPopulatedData = true;
                          
                                  const editButton = document.getElementById('editButton');
                                  if (editButton) {
                                    editButton.style.display = 'block';
                                    editButton.addEventListener('click', function(event) {
                                      if (this.disabled) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        return false;
                                      }
                                      handleEdit(data);
                                      enableEditingControls();
                                      this.style.display = 'none';
                                    });
                                  }
                                  
                                  if (data.STATUS === 'Draft') {
                                    handleTableFieldsForDraft(data);
                                }



                          
                                  isEditMode = false;
                                  updateEditButtonState(data.STATUS);
                                  afterPopulateForm();
                                  enableCommentsField();
                                }
                              }
                            } catch (error) {
                              console.error("Error fetching fleet details:", error);
                            }
                        }



                        function enableCommentsField() {
                          const commentsField = document.querySelector('textarea[name="COMMENTS"]');
                          if (commentsField) {
                              commentsField.disabled = false;
                              commentsField.readOnly = false;
                          }
                      }

                        document.addEventListener('DOMContentLoaded', function() {
                          restoreFleetMasterState();
                        });

                        function handleEdit(data) {
                          if (data.STATUS === 'Draft') {
                            enableAllFields();
                            handleTableFieldsForDraft(data);
                          } else if (data.STATUS === 'Return for Correction') {
                              handleRectificationEdit(data);
                            } else if (data.STATUS === 'Approved') {
                              handleApprovedEdit(data);
                            } else {
                              enableAllFields();
                            }
                          }



                          function handleTableFieldsForDraft(data) {
                          const isDraft = data.STATUS === 'Draft';
                          
                          // Define the arrays for disabled fields
                          const disabledInsuranceFields = ['POLICY_NO', 'POLICY_DATE', 'POLICY_EXPIRY_DATE'];
                          const disabledRegistrationFields = ['REGISTERED_EMIRATES', 'FEDERAL_TRF_FILE_NO', 'REG_COMPANY_NAME', 'TRADE_LICENSE_NO'];
                        
                          // Handle insurance table
                          const insuranceTable = document.querySelector("#insuranceTable tbody");
                          if (insuranceTable) {
                            const insuranceRows = insuranceTable.querySelectorAll('tr');
                            insuranceRows.forEach(row => {
                              const inputs = row.querySelectorAll('input, select');
                              inputs.forEach(input => {
                                const fieldName = input.getAttribute('name');
                                if (isDraft && disabledInsuranceFields.includes(fieldName)) {
                                  input.disabled = true;
                                  input.style.backgroundColor = '#e9ecef';
                                  input.style.color = '#495057';
                                  
                                  // Create hidden input to preserve the value
                                  const hiddenInput = document.createElement('input');
                                  hiddenInput.type = 'hidden';
                                  hiddenInput.name = fieldName;
                                  hiddenInput.value = input.value;
                                  input.parentNode.appendChild(hiddenInput);
                                }
                              });
                            });
                          }
                        
                          // Handle registration table
                          const registrationTable = document.querySelector("#registrationTable tbody");
                          if (registrationTable) {
                            const registrationRows = registrationTable.querySelectorAll('tr');
                            registrationRows.forEach(row => {
                              const inputs = row.querySelectorAll('input, select');
                              inputs.forEach(input => {
                                const fieldName = input.getAttribute('name');
                                if (isDraft && disabledRegistrationFields.includes(fieldName)) {
                                  input.disabled = true;
                                  input.style.backgroundColor = '#e9ecef';
                                  input.style.color = '#495057';
                                  
                                  // Create hidden input to preserve the value
                                  const hiddenInput = document.createElement('input');
                                  hiddenInput.type = 'hidden';
                                  hiddenInput.name = fieldName;
                                  hiddenInput.value = input.value;
                                  input.parentNode.appendChild(hiddenInput);
                                }
                              });
                            });
                          }
                        }

                        function enableNewFieldsOnly() {
                          const inputs = document.querySelectorAll('input, select, textarea');
                          inputs.forEach(input => {
                            if (input.value === '') {
                              input.disabled = false;
                            }
                          });

                          // Enable empty rows in tables
                          const tables = document.querySelectorAll('table');
                          tables.forEach(table => {
                            const rows = table.querySelectorAll('tbody tr');
                            rows.forEach(row => {
                              const inputs = row.querySelectorAll('input, select, textarea');
                              let isEmpty = true;
                              inputs.forEach(input => {
                                if (input.value !== '') {
                                  isEmpty = false;
                                }
                              });
                              if (isEmpty) {
                                inputs.forEach(input => {
                                  input.disabled = false;
                                });
                              }
                            });
                          });

                          // Enable all buttons
                          const buttons = document.querySelectorAll('button');
                          buttons.forEach(button => {
                            button.disabled = false;
                          });
                        }

                        function disableFleetMasterEditing() {
                          const fleetMasterFields = document.querySelectorAll('#vehicleForm input:not([name="FLEET_CONTROL_NO"]), #vehicleForm select');
                          fleetMasterFields.forEach(field => {
                            field.disabled = true;
                          });
                          
                          
                        } 
                         

                        function enableFleetMasterEditing() {
                          const hasApprovedInsuranceRow = data.insurances.some(insurance => insurance.FLEET_PROCESS === 'Approved');
                          const hasApprovedPermitRow = data.permits.some(permit => permit.FLEET_PROCESS === 'Approved');
                          const hasApprovedGpsRow = data.gps.some(gps => gps.FLEET_PROCESS === 'Approved');
                          const hasApprovedRegistrationRow = data.registration.some(registration => registration.FLEET_PROCESS === 'Approved');
                          const hasApprovedFuelRow = data.fuel.some(fuel => fuel.FLEET_PROCESS === 'Approved');
                          const hasApprovedRoadtollRow = data.roadtoll.some(roadtoll => roadtoll.FLEET_PROCESS === 'Approved');
                          const hasApprovedAllocationRow = data.allocation.some(allocation => allocation.FLEET_PROCESS === 'Approved');
                          const hasApprovedDriverRow = data.driver.some(driver => driver.FLEET_PROCESS === 'Approved');

                          if (hasApprovedInsuranceRow || hasApprovedPermitRow || hasApprovedGpsRow ||
                              hasApprovedRegistrationRow || hasApprovedFuelRow || hasApprovedRoadtollRow ||
                              hasApprovedAllocationRow || hasApprovedDriverRow) {
                            disableFleetMasterEditing();
                          } else {
                            const fleetMasterFields = document.querySelectorAll('#vehicleForm input:not([name="FLEET_CONTROL_NO"]), #vehicleForm select');
                            fleetMasterFields.forEach(field => {
                              field.disabled = false;
                            });
                          }
                        }
                        function handleApprovedEdit(data) {
                          const fleetMasterFields = [
                            'FLEET_CREATION_DATE','STATUS','FLEET_CONTROL_NO'
                          ];

                          // Disable all populated fields
                          const inputs = document.querySelectorAll( ' textarea');
                          inputs.forEach(input => {
                            const name = input.getAttribute('name');
                            if (name === 'COMMENTS') {
                              input.disabled = false;
                            } else if (fleetMasterFields.includes(name) || name === 'FLEET_CONTROL_NO') {
                              input.disabled = true;
                              // Create a hidden input to send the value in the request
                              const hiddenInput = document.createElement('input');
                              hiddenInput.type = 'hidden';
                              hiddenInput.name = name;
                              hiddenInput.value = input.value;
                              input.parentNode.appendChild(hiddenInput);
                            } else if (input.value !== '') {
                              input.disabled = true;
                            } else {
                              input.disabled = false;
                            }
                          });

                          const fleetStatusInput = document.querySelector('[name="STATUS"]');
                          if (fleetStatusInput) {
                            // Make it appear disabled visually
                            fleetStatusInput.style.backgroundColor = '#e9ecef';
                            fleetStatusInput.style.color = '#495057';
                            fleetStatusInput.readOnly = true; // Use readOnly instead of disabled

                            // Create a hidden input for FleetStatus
                            const hiddenStatusInput = document.createElement('input');
                            hiddenStatusInput.type = 'hidden';
                            hiddenStatusInput.name = 'STATUS';
                            hiddenStatusInput.value = 'Pending for Approval'; // Always set to 'Pending' when submitting
                            fleetStatusInput.parentNode.appendChild(hiddenStatusInput);
                          }

                          // Handle table rows
                          const tables = ['insuranceTable', 'registrationTable', 'gpsTable', 'permitsTable', 'fuelTable', 'roadtollTable', 'driverTable', 'allocationTable'];
                          const disabledInsuranceFields = ['POLICY_NO', 'POLICY_DATE', 'POLICY_EXPIRY_DATE'];
                          const disabledRegistrationFields = ['REGISTERED_EMIRATES', 'FEDERAL_TRF_FILE_NO', 'REG_COMPANY_NAME', 'TRADE_LICENSE_NO'];

                          
                          tables.forEach(tableId => {
                            const table = document.getElementById(tableId);
                            if (table) {
                              const rows = table.querySelectorAll('tbody tr');
                              rows.forEach((row, index) => {
                                const inputs = row.querySelectorAll('input, select, textarea');
                                inputs.forEach(input => {
                                  if ((tableId === 'insuranceTable' && disabledInsuranceFields.includes(input.name)) ||
                                      (tableId === 'registrationTable' && disabledRegistrationFields.includes(input.name)) ||
                                      (tableId === 'driverTable' && disabledDriverFields.includes(input.name)) ||
                                      (tableId === 'allocationTable' && disabledAllocationFields.includes(input.name))) {
                                    input.disabled = true;
                                    const hiddenInput = document.createElement('input');
                                    hiddenInput.type = 'hidden';
                                    hiddenInput.name = input.name;
                                    hiddenInput.value = input.value;
                                    input.parentNode.appendChild(hiddenInput);
                                  } else {
                                    input.disabled = false;
                                  }
                                });
                              });

                              // Enable the last row if it's empty
                              const lastRow = rows[rows.length - 1];
                              if (lastRow) {
                                const lastRowInputs = lastRow.querySelectorAll('input, select, textarea');
                                let isLastRowEmpty = true;
                                lastRowInputs.forEach(input => {
                                  if (input.value !== '') {
                                    isLastRowEmpty = false;
                                  }
                                });
                                if (isLastRowEmpty) {
                                  lastRowInputs.forEach(input => {
                                    input.disabled = false;
                                  });
                                }
                              }
                            }
                          });

                          // Enable add row and remove row buttons
                          document.getElementById('addRow').disabled = false;
                          document.getElementById('removeRow').disabled = false;

                          isEditMode = true;
                        }


                        
                        
                        function handleRectificationEdit(data) {
                          const hasApprovedRow = ['insurances', 'permits', 'gps', 'registration', 'fuel', 'roadtoll', 'allocation', 'driver'].some(
                            category => data[category].some(item => item.FLEET_PROCESS === 'Approved')
                          );
                        
                          const fieldsToAlwaysDisable = ['FLEET_CONTROL_NO', 'FLEET_CREATION_DATE', 'STATUS'];
                        
                          // Handle main form fields
                          const mainFormInputs = document.querySelectorAll('#vehicleForm input, #vehicleForm select, #vehicleForm textarea');
                          mainFormInputs.forEach(input => {
                            const name = input.getAttribute('name');
                            
                            if (fieldsToAlwaysDisable.includes(name)) {
                              input.disabled = true;
                            } else {
                              input.disabled = false;
                            }
                        
                            // Create hidden input for all fields to ensure data is sent in the request
                            const hiddenInput = document.createElement('input');
                            hiddenInput.type = 'hidden';
                            hiddenInput.name = name;
                            hiddenInput.value = input.value;
                            input.parentNode.appendChild(hiddenInput);
                          });
                        
                          // Handle FleetStatus field
                          const fleetStatusInput = document.querySelector('[name="STATUS"]');
                          if (fleetStatusInput) {
                            fleetStatusInput.style.backgroundColor = '#e9ecef';
                            fleetStatusInput.style.color = '#495057';
                            fleetStatusInput.readOnly = true;
                        
                            // Create a hidden input for FleetStatus
                            const hiddenStatusInput = document.createElement('input');
                            hiddenStatusInput.type = 'hidden';
                            hiddenStatusInput.name = 'STATUS';
                            hiddenStatusInput.value = 'Pending for Approval'; // Set to 'Pending' when submitting
                            fleetStatusInput.parentNode.appendChild(hiddenStatusInput);
                          }
                        
                          // Handle table rows
                          const tables = ['insuranceTable', 'registrationTable', 'gpsTable', 'permitsTable', 'fuelTable', 'roadtollTable', 'driverTable', 'allocationTable'];
                          const disabledInsuranceFields = ['POLICY_NO', 'POLICY_DATE', 'POLICY_EXPIRY_DATE'];
                          const disabledRegistrationFields = ['REGISTERED_EMIRATES', 'FEDERAL_TRF_FILE_NO', 'REG_COMPANY_NAME', 'TRADE_LICENSE_NO'];

                          
                          
                          tables.forEach(tableId => {
                            const table = document.getElementById(tableId);
                            if (table) {
                              const rows = table.querySelectorAll('tbody tr');
                              rows.forEach((row, index) => {
                                const inputs = row.querySelectorAll('input, select, textarea');
                                inputs.forEach(input => {
                                  const name = input.getAttribute('name');
                                  if ((tableId === 'insuranceTable' && disabledInsuranceFields.includes(name)) ||
                                      (tableId === 'registrationTable' && disabledRegistrationFields.includes(name))) {
                                    input.disabled = true;
                                    const hiddenInput = document.createElement('input');
                                    hiddenInput.type = 'hidden';
                                    hiddenInput.name = name;
                                    hiddenInput.value = input.value;
                                    input.parentNode.appendChild(hiddenInput);
                                  } else {
                                    input.disabled = false;
                                  }
                                });
                                
                                const processInput = row.querySelector('input[name="FLEET_PROCESS"]');
                                const isApproved = processInput && processInput.value === 'Approved';
                                if (isApproved) {
                                  row.classList.add('approved-row');
                                } else {
                                  row.classList.remove('approved-row');
                                }
                              });
                            }
                          });
                          
                        
                          // Enable add row and remove row buttons
                          document.getElementById('addRow').disabled = false;
                          document.getElementById('removeRow').disabled = false;
                        
                          isEditMode = true;
                        
                          const commentsField = document.querySelector('[name="COMMENTS"]');
                          if (commentsField) {
                            commentsField.addEventListener('input', function() {
                              const hiddenComments = this.parentNode.querySelector('input[type="hidden"][name="COMMENTS"]');
                              if (hiddenComments) {
                                hiddenComments.value = this.value;
                              }
                            });
                          }
                        }

                      function updateEditButtonState(fleetStatus) {
                          const editButton = document.getElementById('editButton');
                          const isApprover = new URLSearchParams(window.location.search).get('from_approver') === 'true';
                          const cancelButton = document.getElementById('cancelForm');

                          if (cancelButton) {
                            cancelButton.disabled = false;
                            cancelButton.style.pointerEvents = 'auto';
                            cancelButton.style.opacity = '1';
                            cancelButton.style.cursor = 'pointer';
                            //cancelButton.style.backgroundColor = 'white';
                            cancelButton.style.color = 'black';
          
                          }
                          if (isApprover) {
                              // For approver, always show the approver buttons
                              // if (!approverButtonsAdded) {
                              //     showApproverButtons();
                              // }

                              // Enable or disable approver buttons based on fleet status
                              const approverButtons = document.querySelectorAll('.approver-buttons button');
                              approverButtons.forEach(button => {
                                  if (fleetStatus === 'Defleet') {
                                      button.disabled = true;
                                      button.style.pointerEvents = 'none';
                                      button.style.opacity = '0.5';
                                  } else {
                                      button.disabled = false;
                                      button.style.pointerEvents = 'auto';
                                      button.style.opacity = '1';
                                  }
                              });

                              enableSubmitButton();
                              enableCommentsAndButtons();

                              // Hide the regular edit button for approvers
                              if (editButton) {
                                editButton.style.display = 'none';
                              }
                            } else {
                              // For requestor, handle as before
                              if (editButton) {
                                    if (fleetStatus === 'Pending for Approval' || fleetStatus === 'Defleet') {
                                  editButton.disabled = true;
                                  editButton.style.pointerEvents = 'none';
                                  editButton.style.opacity = '0.5';
                                  const tabs = document.querySelectorAll('.tab');
                                  tabs.forEach(tab => {
                                    tab.style.pointerEvents = 'auto';
                                    tab.style.cursor = 'pointer';
                                  });
                                  
                                  initializeTabs();
                                    } else {
                                        editButton.disabled = false;
                                        editButton.style.pointerEvents = 'auto';
                                        editButton.style.opacity = '1';
                                    }
                                }
                            }

                            // Always enable these buttons
                                  const alwaysEnabledButtons = [
                                  document.querySelector('button[onclick="navigateToAllActionHistory()"]'),
                                  document.querySelector('button[onclick="navigateToAllAttachments()"]')
                                ];
                              
                                alwaysEnabledButtons.forEach(button => {
                                  if (button) {
                                    button.disabled = false;
                                    button.style.pointerEvents = 'auto';
                                    button.style.opacity = '1';
                                  }
                                });
                          }
                    

                         async function confirmAndSubmit(action, isApprover, comment) {
                          if (confirm(`Are you sure you want to ${action} this request?`)) {
                              try {
                                  const form = document.getElementById('vehicleForm');
                                  const formData = new FormData(form);
                                  formData.append('ACTION', action);
                                  formData.append('COMMENTS', comment);
                                  console.log('FormData being sent:', Object.fromEntries(formData));
                                  console.log('Status before submission:', formData.get('STATUS'));
    
    
                                  let newStatus;
                                  switch(action) {
                                      case 'Return for Correction':
                                          newStatus = 'Return for Correction';
                                          break;
                                      case 'Approved':
                                          newStatus = 'Approved';
                                          break;
                                      case 'Defleet':
                                          newStatus = 'Defleet';
                                          break;
                                     
                                      default:
                                          newStatus = 'Pending for Approval';
                                  }
    
                                  // Update the status field in the form
                                  const statusField = document.querySelector('input[name="STATUS"]');
                                  if (statusField) {
                                      statusField.value = newStatus;
                                  }
    
                                  formData.set('STATUS', newStatus);
                                  console.log('Status after updating:', formData.get('STATUS'));
    
    
                      
                                  // Ensure all fields are included and complex fields are valid JSON
                                  const allInputs = form.querySelectorAll('input, select, textarea');
                                  allInputs.forEach(input => {
                                      if (input.name) {
                                          let value = input.value || '[]';
                                          if (value === '[]' || value === 'null' || value === '') {
                                              value = JSON.stringify([]);
                                          }
                                          formData.set(input.name, value);
                                      }
                                  });
                      
                                  // Explicitly handle complex fields
                                  ['insurances','registration' ,'fuel','permits', 'gps', 'roadtoll', 'driver', 'allocation'].forEach(field => {
                                      let value = formData.get(field);
                                      if (!value || value === '[]' || value === 'null') {
                                          value = JSON.stringify([]);
                                      } else if (typeof value === 'string' && !value.startsWith('[')) {
                                          // If it's not already a JSON array, wrap it in one
                                          value = JSON.stringify([JSON.parse(value)]);
                                      }
                                      formData.set(field, value);
                                  });
                      
                                  console.log('FormData being sent:', Object.fromEntries(formData));
                      
                                  const response = await fetch('http://127.0.0.1:8000/api/fleet-master', {
                                      method: 'POST',
                                      body: formData
                                  });
                      
                                  if (!response.ok) {
                                      const errorText = await response.text();
                                      throw new Error(`Server error: ${response.status} ${response.statusText}\n${errorText}`);
                                  }
                      
                                  const result = await response.json();
                                  console.log('Form submission result:', result);
    
                                                                
                                  updateStatusDisplay(newStatus);
                                  if (result.message.includes('successfully')) {
                                    showLoadingIndicator();
                                    console.log('Before clearing approver comments:', document.querySelector('textarea[name="COMMENTS"]').value);
                                    const commentsField = document.querySelector('textarea[name="COMMENTS"]');
                                    if (commentsField) {
                                        commentsField.value = '';
                                        console.log('After clearing approver comments:', commentsField.value);
                                    }
                                   
                                    await sendApproverActionEmail(action, isApprover, comment, formData.get('FLEET_CONTROL_NO'));
                                    window.location.href = '/ALY_GTD/approver_dashboard/';
                                } else {
                                    throw new Error('Form submission failed');
                                }
                              } catch (error) {
                                  console.error('Error:', error);
                                  alert(`Failed to process the request: ${error.message}`);
                              } finally {
                                  hideLoadingIndicator();
                              }
                          }
                        }
                        
                        function updateStatusDisplay(status) {
                          const statusField = document.querySelector('input[name="STATUS"]');
                          if (statusField) {
                              statusField.value = status;
                          }
                          const statusDisplays = document.querySelectorAll('.status-display');
                          statusDisplays.forEach(display => {
                              display.textContent = status;
                          });
                        }
                      
                       
                          async function sendApproverActionEmail(action, isApprover, comment, fleetControlNumber) {
                            try {
                                await showComposeModal(fleetControlNumber, action, isApprover, comment);
                                console.log('Email sent successfully after form submission');
                            } catch (error) {
                                console.error('Error sending email:', error);
                                alert('Form submission was successful, but there was an error sending the email.');
                            }
                          }
                        
                          
                    
                        function getAllFileNames(fileData, modelName, instanceId) {
                            if (typeof fileData === 'string' || Array.isArray(fileData)) {
                                const files = typeof fileData === 'string' ? JSON.parse(fileData) : fileData;
                                return files.map((file, index) => {
                                    const fileName = file.trim().split('/').pop().replace(/["'\[\]]/g, '');
                                    // Set model name to 'VEHICLE' for vehicle documents
                                    const actualModelName = modelName || 'VEHICLE';
                                    return createFileItem(fileName, actualModelName, instanceId, index);
                                }).join('');
                            }
                            return '';
                        }
                        
                        

                        function freezeForm() {
                          const form = document.getElementById('vehicleForm');
                          if (!form) {
                            console.error("Form with id 'vehicleForm' not found");
                            return;
                          }
                        
                          // Disable all form elements
                            const elements = form.elements;
                            for (let i = 0; i < elements.length; i++) {
                              elements[i].disabled = true;
                            }
                            const alwaysEnabledButtons = [
                            document.querySelector('button[onclick="navigateToAllActionHistory()"]'),
                            document.querySelector('button[onclick="navigateToAllAttachments()"]')
                          ];
                        
                          alwaysEnabledButtons.forEach(button => {
                            if (button) {
                              button.disabled = false;
                              button.style.pointerEvents = 'auto';
                              button.style.opacity = '1';
                            }
                          });
                          // Disable all buttons within the form
                          const buttons = form.querySelectorAll('button:not([onclick="navigateToAllActionHistory()"]):not([onclick="navigateToAllAttachments()"])');
                          buttons.forEach(button => button.disabled = true);
                          // Disable specific navbar buttons
                          const navbarButtons = ['editButton', 'addRow', 'removeRow', 'submitForm'];
                          navbarButtons.forEach(buttonId => {
                            const button = document.getElementById(buttonId);
                            if (button) {
                              button.disabled = true;
                              button.style.pointerEvents = 'none';
                              button.style.opacity = '0.5';
                            }
                          });
                        
                          // Hide the edit button if it exists
                          const editButton = document.getElementById('editButton');
                          if (editButton) {
                            editButton.style.display = 'none';
                          }
                        
                          // Add a visual indicator that the form is frozen
                          form.classList.add('form-frozen');
                        
                          
                        }


                        function validateAllTables() {
                          const requiredFields = {
                            'insuranceTable': ['INSURANCE_COMPANY', 'POLICY_NO', 'POLICY_DATE', 'PLTS_INS_START_DATE', 'POLICY_EXPIRY_DATE', 'PLTS_INS_EXPIRY_DATE', 'CURRENT STATUS_LOOKUP_NAME'],
                            'registrationTable': ['EMIRATES_TRF_FILE_NO', 'REGISTRATION_NO1', 'REGISTRATION_NO', 'REGISTRATION_DATE', 'REG_EXPIRY_DATE', 'CURRENT STATUS_LOOKUP_NAME'],
                            'driverTable': ['EMPLOYEE_NO', 'EMPLOYEE_NAME', 'DESIGNATION', 'CONTACT_NUMBER', 'ASSIGNMENT_DATE','ASSIGNMENT_END_DATE'],
                            'allocationTable': ['COMPANY NAME_LOOKUP_NAME', 'DIVISIONS_LOOKUP_NAME', 'OPERATING_LOCATION_ALLOCATION_LOOKUP_NAME', 'AE_EMIRATES_LOOKUP_NAME', 'ALLOCATION_DATE']
                          };
                        
                          let errorMessages = [];



                          const insuranceTable = document.getElementById('insuranceTable');
                          if (insuranceTable) {
                            const insuranceRows = insuranceTable.querySelectorAll('tbody tr');
                            let hasValidInsuranceRow = false;
                            let hasPartialInsuranceData = false;

                            insuranceRows.forEach(row => {
                              const insuranceCompany = row.querySelector('input[name="INSURANCE_COMPANY"]')?.value;
                              if (insuranceCompany?.trim()) {
                                // If any insurance data is entered, all required fields must be filled
                                const allFieldsFilled = requiredFields['insuranceTable'].every(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                                  return input && input.value.trim();
                                });
                                
                                if (allFieldsFilled) {
                                  hasValidInsuranceRow = true;
                                } else {
                                  hasPartialInsuranceData = true;
                                }
                              }
                            });

                            if (hasPartialInsuranceData || (!hasValidInsuranceRow && insuranceRows.length > 0)) {
                              errorMessages.push('Please fill in all required fields in the Insurance section.');
                            }
                          }
                          const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
                        
                          for (const [tableId, fields] of Object.entries(requiredFields)) {
                            const table = document.getElementById(tableId);
                            if (table) {
                              const rows = table.querySelectorAll('tbody tr');
                              let tableIsValid = false;
                              let tableHasPartialData = false;
                        
                              rows.forEach(row => {
                                let rowIsValid = true;
                                let rowHasData = false;
                                fields.forEach(fieldName => {
                                  const input = row.querySelector(`[name="${fieldName}"]`);
                                  if (input && !input.value.trim()) {
                                    if (tableId ===  `${activeTab}Table`) {
                                      input.style.border = '2px solid red';
                                    }
                                    rowIsValid = false;
                                  } else if (input && input.value.trim()) {
                                    rowHasData = true;
                                    input.style.border = '';
                                  }
                                });
                        
                                if (rowIsValid) {
                                  tableIsValid = true;
                                }
                                if (rowHasData && !rowIsValid) {
                                  tableHasPartialData = true;
                                }
                              });
                        
                              if (!tableIsValid || (tableId === 'insuranceTable' && tableHasPartialData)) {
                                errorMessages.push(`${tableId.replace('Table', '')} is required. Please fill in all required fields.`);
                              }
                            }
                          }
                        
                          return errorMessages;
                        }

                    
                      function validateVehicleForm() {
                        const mandatoryFields = [
                          'COMPANY NAME_LOOKUP_NAME',
                          'VIN_NO',
                          'MANUFACTURER_LOOKUP_NAME',
                          'MODEL_LOOKUP_NAME',
                          'VEHICLE TYPE_LOOKUP_NAME',
                          'COLOR_LOOKUP_NAME',
                          'FLEET CATEGORY_LOOKUP_NAME',
                          'FLEET SUB CATEGORY_LOOKUP_NAME',
                          'VEHICLE USAGE_LOOKUP_NAME',
                          'ENGINE_NO',
                          'MODEL YEAR_LOOKUP_NAME',
                          'COUNTRY OR ORIGIN_LOOKUP_NAME',
                          'SEATING CAPACITY_LOOKUP_NAME',
                          'TONNAGE_LOOKUP_NAME',
                          'GROSS_WEIGHT_KG',
                          'EMPTY_WEIGHT_KG',
                          'PURCHASE_VALUE_AED'
                        ];

                        let isValid = true;

                        mandatoryFields.forEach(fieldName => {
                          const input = document.querySelector(`[name="${fieldName}"]`);
                          if (input && !input.value.trim()) {
                            input.style.border = '2px solid red';
                            isValid = false;
                          } else if (input) {
                            input.style.border = '';
                          }
                        });

                        return isValid;
                      }
                        
                    
                        //post api for vrhicle and insurance
                        let isNewForm = false;
                        const form = document.getElementById('vehicleForm');
                        const submitButton = document.getElementById('submitForm');
                        submitButton.addEventListener('click', async function (event) {
                          // Inside the submit button event listener, before the fetch call
                        
                          if (isPopulatedData && !isEditMode) {
                            alert("Please enable editing first.");
                            return;
                          }
                          const isVehicleFormValid = validateVehicleForm();
                          const allTablesErrorMessages = validateAllTables();
  
                          const fleetControlNumber = document.querySelector('input[name="FLEET_CONTROL_NO"]').value;
                          const isNewSubmission = !fleetControlNumber;

                          let errorMessages = [];

                            if (!isVehicleFormValid) {
                              errorMessages.push("Please fill in all required fields in the vehicle form.");
                            }

                            if (isNewSubmission) {
                              errorMessages = errorMessages.concat(allTablesErrorMessages);
                            }

                            if (errorMessages.length > 0) {
                              alert(errorMessages.join('\n'));
                              return;
                            }

                            const formData = new FormData(form);
                            const commentsField = document.querySelector('textarea[name="COMMENTS"]');
                            if (commentsField) {
                                formData.append('COMMENTS', commentsField.value);
                            }
                            const statusInput = document.querySelector('input[name="STATUS"]');
                            const action = window.isRequestingCancellation ? 'Request For Cancellation' : '';


                            const currentDate = new Date().toISOString().split('T')[0];
                            formData.set('FLEET_CREATION_DATE', currentDate);



                            const fieldMappings = {
                              'COMPANY NAME_LOOKUP_NAME': 'COMPANY_NAME',
                              'MANUFACTURER_LOOKUP_NAME': 'MANUFACTURER',
                              'MODEL_LOOKUP_NAME':'MODEL',
                              'VEHICLE TYPE_LOOKUP_NAME': 'VEHICLE_TYPE',
                              'COLOR_LOOKUP_NAME': 'COLOR',
                              'FLEET CATEGORY_LOOKUP_NAME': 'FLEET_CATEGORY',
                              'FLEET SUB CATEGORY_LOOKUP_NAME': 'FLEET_SUB_CATEGORY',
                              'VEHICLE USAGE_LOOKUP_NAME':'ApplicationUsage',
                              'MODEL YEAR_LOOKUP_NAME': 'MODEL_YEAR',
                              'COUNTRY OR ORIGIN_LOOKUP_NAME': 'COUNTRY_OF_ORIGIN',
                              'SEATING CAPACITY_LOOKUP_NAME': 'SEATING_CAPACITY',
                              'TONNAGE_LOOKUP_NAME': {
                                  apiName: 'TONNAGE',
                                  handler: (value) => parseFloat(value.split(' ')[0])
                              }

                          };

                          for (let [lookupName, mapping] of Object.entries(fieldMappings)) {
                              const select = form.querySelector(`select[name="${lookupName}"]`);
                              if (select && select.value) {
                                  if (typeof mapping === 'object' && mapping.handler) {
                                      formData.append(mapping.apiName, mapping.handler(select.value));
                                  } else {
                                      formData.append(typeof mapping === 'string' ? mapping : mapping.apiName, select.value);
                                  }
                              }
                          }



                          const fleetStatus = document.querySelector('input[name="STATUS"]').value;

                          console.log("Current FleetStatus:", fleetStatus);

                            const insuranceData = [];
                            const permitData = [];
                            const gpsData = [];
                            const registrationData = [];
                            const fuelData = [];
                            const roadtollData = [];
                            const driverData = [];
                            const allocationData = [];
                            const fromApprover = new URLSearchParams(window.location.search).get('from_approver') === 'true';


                            const insuranceRows = document.querySelectorAll('#insuranceTable tbody tr');
                            insuranceRows.forEach((row, index) => {
                                const idInput = row.querySelector('input[name="insurance_id"]');
                              const insuranceCompany = row.querySelector('input[name="INSURANCE_COMPANY"]')?.value || '';

                            // Skip empty rows
                            if (!insuranceCompany.trim()) {
                                  return; // Skip this iteration if the Insurance Company is empty
                                }
    
                                const insuranceRecord = {
                                  INS_LINE_ID: idInput ? idInput.value : 'new',
                                  INSURANCE_COMPANY: insuranceCompany,
                                  POLICY_NO: row.querySelector('input[name="POLICY_NO"]')?.value ,
                                  POLICY_DATE: row.querySelector('input[name="POLICY_DATE"]')?.value,
                                  POLICY_EXPIRY_DATE: row.querySelector('input[name="POLICY_EXPIRY_DATE"]')?.value ,
                                  PLTS_INS_START_DATE: row.querySelector('input[name="PLTS_INS_START_DATE"]')?.value,
                                  PLTS_INS_EXPIRY_DATE: row.querySelector('input[name="PLTS_INS_EXPIRY_DATE"]')?.value ,
                                  CUR_STAT_MOT_INS: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]')?.value,
                                  FLEET_PROCESS: fleetStatus
                                  };
    

                                  const filteredinsuranceRecord= Object.fromEntries(
                                    Object.entries(insuranceRecord).filter(([key, value]) => value !== '' && value !== null)
                                );

                                insuranceData.push(filteredinsuranceRecord);
                                console.log(`Insurance Record ${index}:`, insuranceRecord);


                                const fileInput = row.querySelector('input[type="file"]');
                                    if (fileInput && fileInput.files.length > 0) {
                                      for (let i = 0; i < fileInput.files.length; i++) {
                                        formData.append(`InsurancePolicAattachment_${index}`, fileInput.files[i]);
                                      }
                                    }
                            });

                            formData.append('insurances', JSON.stringify(insuranceData));
                            formData.append('is_approver', fromApprover ? 'true' : 'false');


                            const permitRows = document.querySelectorAll('#permitsTable tbody tr');
                            permitRows.forEach((row, index) => {
                                const idInput = row.querySelector('input[name="permit_id"]');
                                const permitRecord = {
                                    PERMIT_LINE_ID: idInput ? idInput.value : 'new',
                                    PERMIT_TYPE: row.querySelector('select[name="PERMIT_LOOKUP_NAME"]').value,
                                    EMIRATES: row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]').value,
                                    ISSUING_AUTHORITY: row.querySelector('select[name="ISSUING AUTHORITY_LOOKUP_NAME"]').value,
                                    PERMIT_NO: row.querySelector('input[name="PERMIT_NO"]').value,
                                    PERMIT_DATE: row.querySelector('input[name="PERMIT_DATE"]')?.value || null,
                                    PERMIT_EXPIRY_DATE: row.querySelector('input[name="PERMIT_EXPIRY_DATE"]')?.value || null,
                                    CUR_STAT_PERMIT: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]').value,
                                    PermitColor: row.querySelector('input[name="PermitColor"]') ? row.querySelector('input[name="PermitColor"]').value : null,
                                    FLEET_PROCESS: fleetStatus

                                };

                                const filteredpermitRecord= Object.fromEntries(
                                      Object.entries(permitRecord).filter(([key, value]) => value !== '' && value !== null)
                                  );

                                  permitData.push(filteredpermitRecord);

                                const fileInput = row.querySelector('input[type="file"]');
                                if (fileInput && fileInput.files.length > 0) {
                                    for (let i = 0; i < fileInput.files.length; i++) {
                                        formData.append(`PermitAattachment_${index}`, fileInput.files[i]);
                                    }
                                }
                            });

                            formData.append('permits', JSON.stringify(permitData));
                            formData.append('is_approver', fromApprover ? 'true' : 'false');



                              const gpsRows = document.querySelectorAll('#gpsTable tbody tr');
                              gpsRows.forEach((row, index) => {
                                  const idInput = row.querySelector('input[name="gps_id"]');
                                  const gpsRecord = {
                                      GT_LINE_ID: idInput ? idInput.value : 'new',
                                      GPS_DEVICE_NO: row.querySelector('input[name="GPS_DEVICE_NO"]').value,
                                      GPS_INSTALLATION_DATE: row.querySelector('input[name="GPS_INSTALLATION_DATE"]')?.value || null,
                                      GPS_SERVICE_PROVIDER: row.querySelector('input[name="GPS_SERVICE_PROVIDER"]').value,
                                      FLEET_PROCESS: fleetStatus
                                  };
                                  const filteredgpsRecord= Object.fromEntries(
                                      Object.entries(gpsRecord).filter(([key, value]) => value !== '' && value !== null)
                                  );

                                  gpsData.push(filteredgpsRecord);

                                  const fileInput = row.querySelector('input[type="file"]');
                                  if (fileInput && fileInput.files.length > 0) {
                                      for (let i = 0; i < fileInput.files.length; i++) {
                                          formData.append(`GpsAattachment_${index}`, fileInput.files[i]);
                                      }
                                  }
                              });
                              formData.append('gps', JSON.stringify(gpsData));
                              formData.append('is_approver', fromApprover ? 'true' : 'false');

                              const registrationRows = document.querySelectorAll('#registrationTable tbody tr');
                              registrationRows.forEach((row, index) => {
                                const idInput = row.querySelector('input[name="registration_id"]');
                                const emiratesTrafficFileNumber = row.querySelector('input[name="EMIRATES_TRF_FILE_NO"]')?.value || '';
                                
                                // Skip empty rows
                                if (!emiratesTrafficFileNumber.trim()) {
                                  return; // Skip this iteration if the EmiratesTrafficFileNumber is empty
                                }
                                const registrationRecord = {
                                  REG_LINE_ID: idInput ? idInput.value : 'new',
                                  EMIRATES_TRF_FILE_NO:emiratesTrafficFileNumber,
                                  REGISTERED_EMIRATES: row.querySelector('input[name="REGISTERED_EMIRATES"]')?.value || '',
                                  FEDERAL_TRF_FILE_NO: row.querySelector('input[name="FEDERAL_TRF_FILE_NO"]')?.value || '',
                                  REG_COMPANY_NAME: row.querySelector('input[name="REG_COMPANY_NAME"]')?.value || '',
                                  TRADE_LICENSE_NO: row.querySelector('input[name="TRADE_LICENSE_NO"]')?.value || '',
                                  REGISTRATION_NO1: row.querySelector('input[name="REGISTRATION_NO1"]')?.value || '',
                                  REGISTRATION_NO: row.querySelector('input[name="REGISTRATION_NO"]')?.value || '',
                                  REGISTRATION_DATE: row.querySelector('input[name="REGISTRATION_DATE"]')?.value || null,
                                  REG_EXPIRY_DATE: row.querySelector('input[name="REG_EXPIRY_DATE"]')?.value || null,
                                  CUR_STAT_REG: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]')?.value || '',
                                  FLEET_PROCESS:fleetStatus
                                };
                                const filteredregistrationRecord= Object.fromEntries(
                                      Object.entries(registrationRecord).filter(([key, value]) => value !== '' && value !== null)
                                  );

                                  registrationData.push(filteredregistrationRecord);

                                const fileInput = row.querySelector('input[type="file"]');
                                if (fileInput && fileInput.files.length > 0) {
                                  for (let i = 0; i < fileInput.files.length; i++) {
                                    formData.append(`RegCardAttachment_${index}`, fileInput.files[i]);
                                  }
                                }
                              });
                              formData.append('registration', JSON.stringify(registrationData));
                              formData.append('is_approver', fromApprover ? 'true' : 'false');


                              const fuelRows = document.querySelectorAll('#fuelTable tbody tr');
                              fuelRows.forEach((row, index) => {
                                const idInput = row.querySelector('input[name="fuel_id"]');
                                const fuelRecord = {
                                  FUEL_LINE_ID: idInput ? idInput.value : 'new',
                                  FUEL_TYPE: row.querySelector('select[name="FUEL TYPE_LOOKUP_NAME"]')?.value || '',
                                  MONTHLY_FUEL_LIMIT: row.querySelector('input[name="MONTHLY_FUEL_LIMIT"]').value,
                                  FUEL_SERVICE_TYPE: row.querySelector('select[name="FUEL SERVICE TYPE_LOOKUP_NAME"]').value,
                                  FUEL_SERVICE_PROVIDER: row.querySelector('select[name="FUEL SERVICE PROVIDER_LOOKUP_NAME"]').value,
                                  FUEL_DOCUMENT_NO: row.querySelector('input[name="FUEL_DOCUMENT_NO"]').value,
                                  FUEL_DOCUMENT_DATE: row.querySelector('input[name="FUEL_DOCUMENT_DATE"]')?.value || null,
                                  FUEL_DOC_EXPIRY_DATE: row.querySelector('input[name="FUEL_DOC_EXPIRY_DATE"]')?.value || null,
                                  CUR_STAT_FUEL_DOC: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]').value,
                                  FLEET_PROCESS: fleetStatus
                                };
                                const filteredfuelRecord= Object.fromEntries(
                                      Object.entries(fuelRecord).filter(([key, value]) => value !== '' && value !== null)
                                  );

                                  fuelData.push(filteredfuelRecord);

                                const fileInput = row.querySelector('input[type="file"]');
                                if (fileInput && fileInput.files.length > 0) {
                                  for (let i = 0; i < fileInput.files.length; i++) {
                                    formData.append(`FuelDocumentAttachment_${index}`, fileInput.files[i]);
                                  }
                                }
                              });
                              formData.append('fuel', JSON.stringify(fuelData));
                              formData.append('is_approver', fromApprover ? 'true' : 'false');

                              const roadtollRows = document.querySelectorAll('#roadtollTable tbody tr');
                              roadtollRows.forEach((row, index) => {
                                const idInput = row.querySelector('input[name="roadtoll_id"]');
                                const roadtollRecord = {
                                  RT_LINE_ID: idInput ? idInput.value : 'new',
                                  EMIRATES: row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]').value,
                                  TOLL_TYPE: row.querySelector('select[name="TOLL TYPE_LOOKUP_NAME"]').value,
                                  ACCOUNT_NO: row.querySelector('input[name="ACCOUNT_NO"]').value,
                                  TAG_NO: row.querySelector('input[name="TAG_NO"]').value,
                                  ACTIVATION_DATE: row.querySelector('input[name="ACTIVATION_DATE"]')?.value || null,
                                  
                                  ACTIVATION_END_DATE: row.querySelector('input[name="ACTIVATION_END_DATE"]')?.value || null,

                                  CURRENT_STATUS: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]').value,
                                  FLEET_PROCESS: fleetStatus
                                };
                                const filteredroadtollRecord= Object.fromEntries(
                                      Object.entries(roadtollRecord).filter(([key, value]) => value !== '' && value !== null)
                                  );

                                  roadtollData.push(filteredroadtollRecord);

                                const fileInput = row.querySelector('input[type="file"]');
                                if (fileInput && fileInput.files.length > 0) {
                                  for (let i = 0; i < fileInput.files.length; i++) {
                                    formData.append(`RoadtollAttachments_${index}`, fileInput.files[i]);
                                  }
                                }
                              });
                              formData.append('roadtoll', JSON.stringify(roadtollData));
                              formData.append('is_approver', fromApprover ? 'true' : 'false');


                              
                              const driverRows = document.querySelectorAll('#driverTable tbody tr');
                              driverRows.forEach((row, index) => {
                                  const idInput = row.querySelector('input[name="driver_id"]');
                                  const employeeNo = row.querySelector('input[name="EMPLOYEE_NO"]')?.value || '';
                            
                                  // Skip empty rows
                                  if (!employeeNo.trim()) {
                                    return; // Skip this iteration if the EmiratesTrafficFileNumber is empty
                                  }  
                                  const driverRecord = {
                                      ASGN_LINE_ID: idInput ? idInput.value : 'new',
                                      EMPLOYEE_NO: parseInt(employeeNo.replace(/\D/g, ''), 10),
                                      EMPLOYEE_NAME: row.querySelector('input[name="EMPLOYEE_NAME"]').value,
                                      DESIGNATION: row.querySelector('input[name="DESIGNATION"]').value,
                                      CONTACT_NUMBER: row.querySelector('input[name="CONTACT_NUMBER"]').value,
                                      ASSIGNMENT_DATE: row.querySelector('input[name="ASSIGNMENT_DATE"]')?.value || null,
                                      
                                      ASSIGNMENT_END_DATE: row.querySelector('input[name="ASSIGNMENT_END_DATE"]')?.value || null,
                                      TRAFFIC_CODE_NO: row.querySelector('input[name="TRAFFIC_CODE_NO"]').value,
                                      DRIVING_LICENSE_NO: row.querySelector('input[name="DRIVING_LICENSE_NO"]').value,
                                      LICENSE_TYPE: row.querySelector('input[name="LICENSE_TYPE"]').value,
                                      PLACE_OF_ISSUE: row.querySelector('input[name="PLACE_OF_ISSUE"]').value,
                                      LICENSE_EXPIRY_DATE: row.querySelector('input[name="LICENSE_EXPIRY_DATE"]')?.value || null,
                                      GPS_TAG_NO: row.querySelector('input[name="GPS_TAG_NO"]').value,
                                      GPS_TAG_ASSIGN_DATE: row.querySelector('input[name="GPS_TAG_ASSIGN_DATE"]').value,
                                      FLEET_PROCESS: fleetStatus
                                  };

                                  // Filter out empty fields
                                  const filteredDriverRecord = Object.fromEntries(
                                      Object.entries(driverRecord).filter(([key, value]) => value !== '' && value !== null)
                                  );

                                  driverData.push(filteredDriverRecord);

                                  const fileInput = row.querySelector('input[type="file"]');
                                  if (fileInput && fileInput.files.length > 0) {
                                      for (let i = 0; i < fileInput.files.length; i++) {
                                          formData.append(`DriverAttachments_${index}`, fileInput.files[i]);
                                      }
                                  }
                              });
                              formData.append('driver', JSON.stringify(driverData));
                              formData.append('is_approver', fromApprover ? 'true' : 'false');



                              const allocationRows = document.querySelectorAll('#allocationTable tbody tr');
                              allocationRows.forEach((row, index) => {
                                const idInput = row.querySelector('input[name="allocation_id"]');
                                const allocationRecord = {
                                  ALLOC_LINE_ID: idInput ? idInput.value : 'new',
                                  COMPANY_NAME: row.querySelector('select[name="COMPANY NAME_LOOKUP_NAME"]').value,
                                  DIVISION: row.querySelector('select[name="DIVISIONS_LOOKUP_NAME"]').value,
                                  OPERATING_LOCATION: row.querySelector('select[name="OPERATING_LOCATION_ALLOCATION_LOOKUP_NAME"]').value,
                                  OPERATING_EMIRATES: row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]').value,
                                  ALLOCATION_DATE: row.querySelector('input[name="ALLOCATION_DATE"]')?.value || null,
                                  
                                  ALLOCATION_END_DATE: row.querySelector('input[name="ALLOCATION_END_DATE"]')?.value || null,
                                  FLEET_PROCESS: fleetStatus
                                };
                                const filteredallocationRecord= Object.fromEntries(
                                      Object.entries(allocationRecord).filter(([key, value]) => value !== '' && value !== null)
                                  );

                                  allocationData.push(filteredallocationRecord);

                                const fileInput = row.querySelector('input[type="file"]');
                                if (fileInput && fileInput.files.length > 0) {
                                  for (let i = 0; i < fileInput.files.length; i++) {
                                    formData.append(`attachment_${index}`, fileInput.files[i]);
                                  }
                                }
                              });
                              formData.append('allocation', JSON.stringify(allocationData));
                              formData.append('is_approver', fromApprover ? 'true' : 'false');






                            formData.append('insurances', JSON.stringify(insuranceData));
                            formData.append('permits', JSON.stringify(permitData));
                            formData.append('allocation', JSON.stringify(allocationData));
                            formData.append('driver', JSON.stringify(driverData));
                            formData.append('roadtoll', JSON.stringify(roadtollData));
                            formData.append('fuel', JSON.stringify(fuelData));
                            formData.append('registration', JSON.stringify(registrationData));
                            formData.append('gps', JSON.stringify(gpsData));

                            if (action) {
                                  formData.append('ACTION', action);
                              }


                            try {
                                const response = await fetch('http://127.0.0.1:8000/api/fleet-master', {
                                    method: 'POST',
                                    body: formData,
                                  
                                    
                                });
                                const data = await response.json();
                                console.log(data);

                                if (!response.ok) {
                                    const errorText = await response.text();
                                    console.error('Error response:', errorText);
                                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                                }


                              
                                console.log('Success:', data);

                                alert(`Fleet master and insurance and registration and gps and permits information submitted successfully!\nFleet Control Number: ${data.fleet_master.FLEET_CONTROL_NO}`);
                              
                               

                               console.log('Data structure:', JSON.stringify(data, null, 2));
                      
                               if (data.fleet_master) {
                                 const fleetControlNumber = data.fleet_master;
                                 
                                 // Log COMM_CONTROL_NO for debugging
                                 console.log('FLEET_CONTROL_NO:', data.fleet_master.FLEET_CONTROL_NO);
                                 
                                 if (action === 'Request For Cancellation') {
                                     try {
                                         await sendCancellationEmail(data.fleet_master.FLEET_CONTROL_NO);
                                         console.log('Cancellation email sent successfully.');
                                     } catch (error) {
                                         console.error('Error sending cancellation email:', error);
                                     }
                                 } else {
                                     try {
                                      await sendEmailAutomatically(data.fleet_master.FLEET_CONTROL_NO, data.fleet_master,isNewSubmission);
                                         console.log('Submission email sent successfully.');
                                     } catch (error) {
                                         console.error('Error sending submission email:', error);
                                     }
                                 }
                                 window.isRequestingCancellation = false;
                             } else {
                                 console.error('Unexpected API response:', data);
                                 alert('Unexpected API response. Please check the console for details.');
                             }
                             console.log('Before clearing comments:', document.querySelector('textarea[name="COMMENTS"]').value);
                             const commentsField = document.querySelector('textarea[name="COMMENTS"]');
                             if (commentsField) {
                                 commentsField.value = '';
                                 console.log('After clearing comments:', commentsField.value);
                             }
                                clearForm();
                                form.reset();
                                clearInsuranceTable();
                                cleargpsTable();
                                clearPermitTable();
                                clearFuelTable();
                                clearRegistrationTable();
                                clearRoadtollTable();
                                clearDriverTable();
                                clearAllocationTable();

                                document.querySelectorAll('#insuranceTable tbody tr input, #insuranceTable tbody tr select').forEach(input => {
                                    input.value = '';
                                });
                                document.querySelectorAll('input[type="file"]').forEach(input => {
                                    input.value = '';
                                });

                            } catch (error) {
                                console.error('Detailed error:', error);
                                //alert(`An error occurred while submitting the information: ${error.message}`);
                            }
                        });


                       
                        async function sendEmailAutomatically(fleetControlNumber, fleetData, isNewSubmission) {
                          console.log('Starting sendEmailAutomatically function');
                          const response = await fetch(`http://127.0.0.1:8000/api/fleet-master/${fleetControlNumber}`);
                          const completeFleetData = await response.json();
                           console.log('Complete fleet Data:', JSON.stringify(completeFleetData, null, 2));
                         
                          const lookupValue = isNewSubmission ? 'NEW_FLEET_MASTER' : 'EDIT_FLEET_MASTER';
                          console.log(`Using lookup value: ${lookupValue}`);
                          const action = isNewSubmission ? 'New' : 'Modified';
                          console.log(`Current Action: ${action}`);
                        
                          const emailAddresses = await fetchEmailAddresses(lookupValue);
                          console.log('Fetched email addresses:', emailAddresses);
                        
                          if (!emailAddresses) {
                            console.error('Failed to fetch email addresses');
                            return;
                          }
                        
                          const { toEmail, ccEmail } = emailAddresses;
                          console.log(`To Email: ${toEmail}, CC Email: ${ccEmail}`);
                        
                          if (!toEmail) {
                            console.error('No valid TO email address found');
                            return;
                          }
                        
                          const vinNo = completeFleetData.VIN_NO || 'N/A';
                          const registrationNo1 = completeFleetData.registration && completeFleetData.registration[0] ? completeFleetData.registration[0].REGISTRATION_NO1 || 'N/A' : 'N/A';

                          const subject = isNewSubmission
                            ? `Action required: New Fleet Details ${fleetControlNumber}/${vinNo}/${registrationNo1} requires your approval`
                            : `Action required: Modified Fleet Details ${fleetControlNumber}/${vinNo}/${registrationNo1} requires your approval`;
                          console.log(`Email subject: ${subject}`);
                        
                          let comparisonData = null;
                          if (!isNewSubmission) {
                            console.log('This is an edit submission, fetching comparison data');
                            try {
                              const headerId = completeFleetData.HEADER_ID;
                              console.log(`Using HEADER_ID for comparison: ${headerId}`);
                              const comparisonResponse = await fetch(`http://127.0.0.1:8000/api/compare-data/${headerId}`);
                              console.log('Comparison data API response status:', comparisonResponse.status);
                        
                              if (!comparisonResponse.ok) {
                                throw new Error(`HTTP error! status: ${comparisonResponse.status}`);
                              }
                              console.log('Comparison data being sent:', comparisonData);

                        
                              comparisonData = await comparisonResponse.json();
                              console.log('Comparison data received:', comparisonData);
                            } catch (error) {
                              console.error('Error fetching comparison data:', error);
                            }
                          }
                        
                          const formData = new FormData();
                          formData.append('recipient', toEmail);
                          formData.append('cc', ccEmail || '');
                          formData.append('bcc', '');
                          formData.append('subject', subject);
                          formData.append('data', JSON.stringify(completeFleetData));
                          formData.append('custom_message', isNewSubmission ? 'New fleet Details submission for your approval' : 'Updated fleet details for your approval');
                          formData.append('is_new_submission', isNewSubmission);
                          formData.append('action', action); 
                          
                          if (comparisonData) {
                            formData.append('comparison_data', JSON.stringify(comparisonData));
                          }
                        
                          console.log('FormData created with basic information');
                        
                          console.log('Sending email...');
                          try {
                            showEmailSendingPopup(
                              fetch('http://127.0.0.1:8000/api/send-email', {
                                method: 'POST',
                                body: formData
                              }).then(response => {
                                console.log('Email API response status:', response.status);
                                if (!response.ok) {
                                  throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.json();
                              }).then(result => {
                                if (result.status === 'success') {
                                  console.log('Email sent successfully!');
                                } else {
                                  throw new Error(result.message);
                                }
                              })
                            );
                          } catch (error) {
                            console.error('Error sending email:', error);
                           // alert(`Failed to send email: ${error.message}`);
                          }
                        
                          console.log('sendEmailAutomatically function completed');
                        }
                        

                                                                
                        // Add this function if it's not already defined
                        async function sendCancellationEmail(fleetControlNumber) {
                          try {
                              const emailAddresses = await fetchEmailAddresses('CANCEL_FLEET_MASTER');
                              if (!emailAddresses || !emailAddresses.toEmail) {
                                  throw new Error('No valid email addresses found for CANCEL_FLEET_MASTER');
                              }
  
                              const fleetResponse = await fetch(`http://127.0.0.1:8000/api/fleet-master/${fleetControlNumber}`);
                              const fleetData = await fleetResponse.json();
  
                              const vinNo = fleetData.VIN_NO || 'N/A';
                              const REGISTRATION_NO1 = fleetData.registration[0]?.REGISTRATION_NO1 || 'N/A';
  
                              const subject = `Action Required : Cancellation Request for Fleet Details : ${fleetControlNumber}/${vinNo}/${REGISTRATION_NO1}`;
                              const action = 'Sending for Cancellation';
                              const formData = new FormData();
                              formData.append('recipient', emailAddresses.toEmail);
                              formData.append('cc', emailAddresses.ccEmail || '');
                              formData.append('subject', subject);
                              formData.append('custom_message', 'A cancellation request has been submitted for the following fleet:');
                              formData.append('data', JSON.stringify(fleetData));
                              formData.append('data', JSON.stringify({...fleetData, ACTION: action}));
                              formData.append('action', action);
  
                              showEmailSendingPopup(
                                  fetch('http://127.0.0.1:8000/api/send-email', {
                                      method: 'POST',
                                      body: formData
                                  }).then(response => {
                                      if (!response.ok) {
                                          throw new Error(`HTTP error! status: ${response.status}`);
                                      }
                                      return response.json();
                                  }).then(result => {
                                      if (result.status !== 'success') {
                                          throw new Error(result.message);
                                      }
                                      console.log('Cancellation email sent successfully');
                                  })
                              );
                          } catch (error) {
                              console.error('Error:', error);
                              alert(`Failed to send cancellation email: ${error.message}`);
                          }
                      }
  
  
                      const cancelBtn = document.getElementById('cancelForm');

                      if (cancelBtn) {
                          cancelBtn.addEventListener('click', function() {
                              const statusInput = document.querySelector('input[name="STATUS"]');
                              const comment = document.querySelector('textarea[name="COMMENTS"]').value.trim();
                                
                              // First check for comments
                              if (!comment) {
                                  alert('Please add comments before requesting cancellation');
                                  return;
                              }
                              
                              // Check all statuses from different tables
                              const insuranceStatuses = Array.from(document.querySelectorAll('#insuranceTable tbody tr select[name="CURRENT STATUS_LOOKUP_NAME"]'))
                                  .filter(select => select.closest('tr').style.display !== 'none')
                                  .map(select => select.value);
                                  
                              const registrationStatuses = Array.from(document.querySelectorAll('#registrationTable tbody tr select[name="CURRENT STATUS_LOOKUP_NAME"]'))
                                  .filter(select => select.closest('tr').style.display !== 'none')
                                  .map(select => select.value);
                                  
                              const roadtollStatuses = Array.from(document.querySelectorAll('#roadtollTable tbody tr select[name="CURRENT STATUS_LOOKUP_NAME"]'))
                                  .filter(select => select.closest('tr').style.display !== 'none')
                                  .map(select => select.value);
                                  
                              const permitStatuses = Array.from(document.querySelectorAll('#permitsTable tbody tr select[name="CURRENT STATUS_LOOKUP_NAME"]'))
                                  .filter(select => select.closest('tr').style.display !== 'none')
                                  .map(select => select.value);
                                  
                              const fuelStatuses = Array.from(document.querySelectorAll('#fuelTable tbody tr select[name="CURRENT STATUS_LOOKUP_NAME"]'))
                                  .filter(select => select.closest('tr').style.display !== 'none')
                                  .map(select => select.value);
                                  
                              const hasActiveStatus = [...insuranceStatuses, ...registrationStatuses, ...roadtollStatuses, ...permitStatuses, ...fuelStatuses]
                                  .some(status => status === 'Active');
                                  
                              if (hasActiveStatus) {
                                  alert('Cannot cancel the form while any record status is active');
                                  return;
                              }
                                
                              statusInput.value = 'Request For Cancellation';
                              
                              if (confirm('Are you sure you want to request cancellation for this fleet?')) {
                                  // Instead of calling submitForm directly, we'll set a flag and trigger the submit button
                                  window.isRequestingCancellation = true;
                                  document.getElementById('submitForm').click();
                              } else {
                                  statusInput.value = ''; 
                              }
                          });
                      }
                        

                        function showEmailSendingPopup(emailSendingPromise) {
                          // Create and show loading indicator
                          const loadingIndicator = document.createElement('div');
                          loadingIndicator.className = 'loading-indicator';
                          loadingIndicator.style.position = 'fixed';
                          loadingIndicator.style.top = '50%';
                          loadingIndicator.style.left = '50%';
                          loadingIndicator.style.transform = 'translate(-50%, -50%)';
                          loadingIndicator.style.zIndex = '1000';
                          
                          // Add your preferred loading indicator styles here
                          // For example, a simple spinning circle:
                          loadingIndicator.style.width = '40px';
                          loadingIndicator.style.height = '40px';
                          loadingIndicator.style.border = '4px solid #f3f3f3';
                          loadingIndicator.style.borderTop = '4px solid #3498db';
                          loadingIndicator.style.borderRadius = '50%';
                          loadingIndicator.style.animation = 'spin 1s linear infinite';

                          // Add keyframe animation for spin
                          const style = document.createElement('style');
                          style.textContent = `
                              @keyframes spin {
                                  0% { transform: translate(-50%, -50%) rotate(0deg); }
                                  100% { transform: translate(-50%, -50%) rotate(360deg); }
                              }
                          `;
                          document.head.appendChild(style);

                          document.body.appendChild(loadingIndicator);

                          // Handle the email sending promise
                          emailSendingPromise
                              .then(result => {
                                  // Handle success (you might want to show a success icon briefly)
                              })
                              .catch(error => {
                                  console.error('Email sending error:', error);
                                  // Handle error (you might want to show an error icon briefly)
                              })
                              .finally(() => {
                                  // Remove loading indicator
                                  document.body.removeChild(loadingIndicator);
                                  document.head.removeChild(style);
                              });
                      }



                        let storedEmailAddresses = null;

                        async function fetchAndStoreEmailAddresses() {
                          if (!storedEmailAddresses) {
                            try {
                              const response = await fetch('http://127.0.0.1:8000/api/related-data/?lookup_name=EMAIL_SETUPS');
                              if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                              }
                              storedEmailAddresses = await response.json();
                            } catch (error) {
                              console.error('Error fetching email addresses:', error);
                              storedEmailAddresses = null;
                            }
                          }
                          return storedEmailAddresses;
                        }


                        async function fetchEmailAddresses(lookupValue) {
                          try {
                              const response = await fetch(`http://127.0.0.1:8000/api/related-data/?lookup_value=${lookupValue}`);
                              if (!response.ok) {
                                  throw new Error(`HTTP error! status: ${response.status}`);
                              }
                              const data = await response.json();
                              
                              const toEmail = data.find(item => item.LOOKUP_CODE === 'TO' && item.ACTIVE === 'Y')?.MEANING;
                              const ccEmail = data.find(item => item.LOOKUP_CODE === 'CC' && item.ACTIVE === 'Y')?.MEANING;
                              
                              return { toEmail, ccEmail };
                          } catch (error) {
                              console.error(`Error fetching email addresses for ${lookupValue}:`, error);
                              return null;
                          }
                        }
                  
                     
                        async function showComposeModal(fleetControlNumber, action = '', isApprover = false,comment = '') {
                          console.log('Action received in showComposeModal:', action);

                          const emailAddresses = await fetchAndStoreEmailAddresses();
                          
                          let toEmail = '';
                          let ccEmails = '';

                          if (emailAddresses) {
                            const toEmailObj = emailAddresses.find(item => item.LOOKUP_CODE === 'TO' && item.ACTIVE === 'Y');
                            const ccEmailsObj = emailAddresses.find(item => item.LOOKUP_CODE === 'CC' && item.ACTIVE === 'Y');

                            if (toEmailObj) toEmail = toEmailObj.MEANING;
                            if (ccEmailsObj) ccEmails = ccEmailsObj.MEANING;
                          }

                          try {
                              const response = await fetch(`http://127.0.0.1:8000/api/fleet-master/${fleetControlNumber}`);
                              if (!response.ok) {
                                  throw new Error(`HTTP error! status: ${response.status}`);
                              }
                              const data = await response.json();
                              data.COMMENTS = comment;
                              const vinNo = data.VIN_NO || 'N/A';
                      
                              let subject;
                              const fleetInfo = `${fleetControlNumber}/${vinNo}`;
                              let newStatus = '';
                              if (isApprover && action) {
                                  switch(action) {
                                      case 'Return for Correction':
                                          newStatus = 'Return for Correction';
                                          data.ACTION = 'Return for Correction';
                                          subject = `Fleet Details: ${fleetInfo} request is return for correction.`;
                                          break;
                                      case 'Approved':
                                          newStatus = 'Approved';
                                          data.ACTION = 'Approved';
                                          subject = `Fleet Details: ${fleetInfo} has been approved`;
                                          break;
                                      case 'Revert':
                                          newStatus = 'Rejected';
                                          data.ACTION = 'Rejected';
                                          subject = `Fleet Details ${fleetInfo} requested has been rejected`;
                                          break;
                                      case 'Defleet':
                                          newStatus = 'Defleet';
                                          data.ACTION = 'Defleet';
                                          subject = `Fleet Details: ${fleetInfo} request has been defleeted`;
                                          break;
                                      default:
                                          newStatus = data.STATUS;
                                          data.ACTION = data.ACTION || 'New';
                                          subject = `A New Fleet ${fleetInfo} requires approval`;
                                      }
                                    } else {
                                      if (!isApprover) {
                                            if (data.STATUS === 'Return for Correction') {
                                                data.ACTION = 'Modified';
                                            } else if (data.STATUS === 'Pending for Approval' && !data.ACTION) {
                                                data.ACTION = 'New';
                                            } else {
                                                data.ACTION = data.ACTION || data.STATUS;
                                            }
                                          }
                                        subject = `Action required: ${data.ACTION} Fleet Details ${fleetInfo} requires your approval`;
                                    }

                              data.STATUS = newStatus;
                              console.log('Subject set:', subject);

                              const formData = new FormData();
                              formData.append('data', JSON.stringify(data));
                              formData.append('recipient', toEmail);
                              formData.append('cc', ccEmails);
                              formData.append('subject', subject);
                              formData.append('data', JSON.stringify(data));
                              formData.append('is_approver_action', isApprover.toString());
                              formData.append('action', data.ACTION);
                              formData.append('is_new_submission', (!isApprover).toString());
                      
                              const emailResponse = await fetch('http://127.0.0.1:8000/api/send-email', {
                                method: 'POST',
                                body: formData
                              });
                      
                              if (!emailResponse.ok) {
                                  throw new Error(`HTTP error! status: ${emailResponse.status}`);
                              }
                      
                              const result = await emailResponse.json();
                      
                              if (result.status === 'success') {
                                console.log('Email sent successfully!');
                                if (window.submitFormAfterEmail) {
                                  window.submitFormAfterEmail();
                                }
                              } else {
                                throw new Error(result.message);
                              }
                                            } catch (error) {
                              console.error('Error fetching vehicle info or sending email:', error);
                              //alert(`Failed to send email: ${error.message}`);
                              }
                        }
                   


                        const saveButton = document.getElementById('saveform');
                        saveButton.addEventListener('click', async function (event) {
                          if (isPopulatedData && !isEditMode) {
                            alert("Please enable editing first.");
                            return;
                          }

                          
                          const form = document.getElementById('vehicleForm');
                          const formData = new FormData(form);

                          const fieldMappings = {
                            'COMPANY NAME_LOOKUP_NAME': 'COMPANY_NAME',
                            'MANUFACTURER_LOOKUP_NAME': 'MANUFACTURER',
                            'MODEL_LOOKUP_NAME':'MODEL',
                            'VEHICLE TYPE_LOOKUP_NAME': 'VEHICLE_TYPE',
                            'COLOR_LOOKUP_NAME': 'COLOR',
                            'FLEET CATEGORY_LOOKUP_NAME': 'FLEET_CATEGORY',
                            'FLEET SUB CATEGORY_LOOKUP_NAME': 'FLEET_SUB_CATEGORY',
                            'VEHICLE USAGE_LOOKUP_NAME':'ApplicationUsage',
                            'MODEL YEAR_LOOKUP_NAME': 'MODEL_YEAR',
                            'COUNTRY OR ORIGIN_LOOKUP_NAME': 'COUNTRY_OF_ORIGIN',
                            'SEATING CAPACITY_LOOKUP_NAME': 'SEATING_CAPACITY',
                            'TONNAGE_LOOKUP_NAME': {
                              apiName: 'TONNAGE',
                              handler: (value) => parseFloat(value.split(' ')[0])
                            }
                          };

                          for (let [lookupName, mapping] of Object.entries(fieldMappings)) {
                            const select = form.querySelector(`select[name="${lookupName}"]`);
                            if (select && select.value) {
                              if (typeof mapping === 'object' && mapping.handler) {
                                formData.append(mapping.apiName, mapping.handler(select.value));
                              } else {
                                formData.append(typeof mapping === 'string' ? mapping : mapping.apiName, select.value);
                              }
                            }
                          }

                          const numericFields = ['GROSS_WEIGHT_KG', 'EMPTY_WEIGHT_KG', 'PURCHASE_VALUE_AED', 'TONNAGE'];
                          numericFields.forEach(field => {
                            const input = form.querySelector(`input[name="${field}"]`);
                            if (input && input.value.trim() !== '') {
                              const numValue = parseFloat(input.value);
                              if (!isNaN(numValue)) {
                                formData.append(field, numValue);
                              }
                            }
                          });

                          const insuranceData = [];
                          const permitData = [];
                          const gpsData = [];
                          const registrationData = [];
                          const fuelData = [];
                          const roadtollData = [];
                          const driverData = [];
                          const allocationData = [];

                          const insuranceRows = document.querySelectorAll('#insuranceTable tbody tr');
                          insuranceRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="insurance_id"]');
                            const insuranceCompany = row.querySelector('input[name="INSURANCE_COMPANY"]')?.value || '';

                            // Skip empty rows
                            if (!insuranceCompany.trim()) {
                              return; // Skip this iteration if the Insurance Company is empty
                            }

                            const insuranceRecord = {
                              INS_LINE_ID: idInput ? idInput.value : 'new',
                              INSURANCE_COMPANY: insuranceCompany,
                              POLICY_NO: row.querySelector('input[name="POLICY_NO"]')?.value || '',
                              POLICY_DATE: row.querySelector('input[name="POLICY_DATE"]').value || null,
                              POLICY_EXPIRY_DATE: row.querySelector('input[name="POLICY_EXPIRY_DATE"]').value || null,
                              PLTS_INS_START_DATE: row.querySelector('input[name="PLTS_INS_START_DATE"]').value || null,
                              PLTS_INS_EXPIRY_DATE: row.querySelector('input[name="PLTS_INS_EXPIRY_DATE"]').value || null,
                              CUR_STAT_MOT_INS: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]')?.value || ''
                            };

                            insuranceData.push(insuranceRecord);

                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0; i < fileInput.files.length; i++) {
                                formData.append(`InsurancePolicAattachment_${index}`, fileInput.files[i]);
                              }
                            }
                          });

                          formData.append('insurances', JSON.stringify(insuranceData));

                          const permitRows = document.querySelectorAll('#permitsTable tbody tr');
                          permitRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="permit_id"]');
                            const permitRecord = {
                              PERMIT_LINE_ID: idInput ? idInput.value : 'new',
                              PERMIT_TYPE: row.querySelector('select[name="PERMIT_LOOKUP_NAME"]').value,
                              EMIRATES: row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]').value,
                              ISSUING_AUTHORITY: row.querySelector('select[name="ISSUING AUTHORITY_LOOKUP_NAME"]').value,
                              PERMIT_NO: row.querySelector('input[name="PERMIT_NO"]').value,
                              PERMIT_DATE: row.querySelector('input[name="PERMIT_DATE"]').value || null,
                              PERMIT_EXPIRY_DATE: row.querySelector('input[name="PERMIT_EXPIRY_DATE"]').value || null,
                              CUR_STAT_PERMIT: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]').value,
                              PermitColor: row.querySelector('input[name="PermitColor"]') ? row.querySelector('input[name="PermitColor"]').value : null
                            };
                            permitData.push(permitRecord);
                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0; i < fileInput.files.length; i++) {
                                formData.append(`PermitAattachment_${index}`, fileInput.files[i]);
                              }
                            }
                          });
                          formData.append('permits', JSON.stringify(permitData));

                          const gpsRows = document.querySelectorAll('#gpsTable tbody tr');
                          gpsRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="gps_id"]');
                            const gpsRecord = {
                              GT_LINE_ID: idInput ? idInput.value : 'new',
                              GPS_DEVICE_NO: row.querySelector('input[name="GPS_DEVICE_NO"]').value,
                              GPS_INSTALLATION_DATE: row.querySelector('input[name="GPS_INSTALLATION_DATE"]').value || null,
                              GPS_SERVICE_PROVIDER: row.querySelector('input[name="GPS_SERVICE_PROVIDER"]').value
                            };
                            gpsData.push(gpsRecord);
                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0; i < fileInput.files.length; i++) {
                                formData.append(`GpsAattachment_${index}`, fileInput.files[i]);
                              }
                            }
                          });
                          formData.append('gps', JSON.stringify(gpsData));

                          const registrationRows = document.querySelectorAll('#registrationTable tbody tr');
                          registrationRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="registration_id"]');
                            const emiratesTrafficFileNumber = row.querySelector('input[name="EMIRATES_TRF_FILE_NO"]')?.value || '';
                            
                            // Skip empty rows
                            if (!emiratesTrafficFileNumber.trim()) {
                              return; // Skip this iteration if the EmiratesTrafficFileNumber is empty
                            }                          
                            const registrationRecord = {
                              REG_LINE_ID: idInput ? idInput.value : 'new',
                              EMIRATES_TRF_FILE_NO: emiratesTrafficFileNumber,
                              REGISTERED_EMIRATES: row.querySelector('input[name="REGISTERED_EMIRATES"]')?.value || '',
                              FEDERAL_TRF_FILE_NO: row.querySelector('input[name="FEDERAL_TRF_FILE_NO"]')?.value || '',
                              REG_COMPANY_NAME: row.querySelector('input[name="REG_COMPANY_NAME"]')?.value || '',
                              TRADE_LICENSE_NO: row.querySelector('input[name="TRADE_LICENSE_NO"]')?.value || '',
                              REGISTRATION_NO1: row.querySelector('input[name="REGISTRATION_NO1"]')?.value || '',
                              REGISTRATION_NO: row.querySelector('input[name="REGISTRATION_NO"]')?.value || '',
                              REGISTRATION_DATE: row.querySelector('input[name="REGISTRATION_DATE"]').value || null,
                              REG_EXPIRY_DATE: row.querySelector('input[name="REG_EXPIRY_DATE"]').value || null,
                              CUR_STAT_REG: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]')?.value || ''
                            };
                            registrationData.push(registrationRecord);
                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0; i < fileInput.files.length; i++) {
                                formData.append(`RegCardAttachment_${index}`, fileInput.files[i]);
                              }
                            }
                          });
                          formData.append('registration', JSON.stringify(registrationData));

                          const fuelRows = document.querySelectorAll('#fuelTable tbody tr');
                          fuelRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="fuel_id"]');
                            const fuelRecord = {
                              FUEL_LINE_ID: idInput ? idInput.value : 'new',
                              FUEL_TYPE: row.querySelector('select[name="FUEL TYPE_LOOKUP_NAME"]').value || '',
                              MONTHLY_FUEL_LIMIT: row.querySelector('input[name="MONTHLY_FUEL_LIMIT"]').value || '',
                              FUEL_SERVICE_TYPE: row.querySelector('select[name="FUEL SERVICE TYPE_LOOKUP_NAME"]').value || '',
                              FUEL_SERVICE_PROVIDER: row.querySelector('select[name="FUEL SERVICE PROVIDER_LOOKUP_NAME"]').value || '',
                              FUEL_DOCUMENT_NO: row.querySelector('input[name="FUEL_DOCUMENT_NO"]').value || '',
                              FUEL_DOCUMENT_DATE: row.querySelector('input[name="FUEL_DOCUMENT_DATE"]').value || null,
                              FUEL_DOC_EXPIRY_DATE: row.querySelector('input[name="FUEL_DOC_EXPIRY_DATE"]').value || null,
                              CUR_STAT_FUEL_DOC: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]').value || ''
                            };
                            fuelData.push(fuelRecord);
                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0; i < fileInput.files.length; i++) {
                                formData.append(`FuelDocumentAttachment_${index}`, fileInput.files[i]);
                              }
                            }
                          });
                          formData.append('fuel', JSON.stringify(fuelData));

                          const roadtollRows = document.querySelectorAll('#roadtollTable tbody tr');
                          roadtollRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="roadtoll_id"]');
                            const roadtollRecord = {
                              RT_LINE_ID: idInput ? idInput.value : 'new',
                              EMIRATES: row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]').value,
                              TOLL_TYPE: row.querySelector('select[name="TOLL TYPE_LOOKUP_NAME"]').value,
                              ACCOUNT_NO: row.querySelector('input[name="ACCOUNT_NO"]').value,
                              TAG_NO: row.querySelector('input[name="TAG_NO"]').value,
                              ACTIVATION_DATE: row.querySelector('input[name="ACTIVATION_DATE"]')?.value || null,
                              
                              ACTIVATION_END_DATE: row.querySelector('input[name="ACTIVATION_END_DATE"]')?.value || null,
                              CURRENT_STATUS: row.querySelector('select[name="CURRENT STATUS_LOOKUP_NAME"]').value
                            };
                            roadtollData.push(roadtollRecord);
                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0; i < fileInput.files.length; i++) {
                                formData.append(`RoadtollAttachments_${index}`, fileInput.files[i]);
                              }
                            }
                          });
                          formData.append('roadtoll', JSON.stringify(roadtollData));

                          const driverRows = document.querySelectorAll('#driverTable tbody tr');
                          driverRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="driver_id"]');
                            const employeeNo = row.querySelector('input[name="EMPLOYEE_NO"]')?.value || '';
                            
                            // Skip empty rows
                            if (!employeeNo.trim()) {
                              return; // Skip this iteration if the EmiratesTrafficFileNumber is empty
                            }   
                            const driverRecord = {
                              ASGN_LINE_ID: idInput ? idInput.value : 'new',
                              EMPLOYEE_NO: employeeNo,
                              EMPLOYEE_NAME: row.querySelector('input[name="EMPLOYEE_NAME"]').value,
                              DESIGNATION: row.querySelector('input[name="DESIGNATION"]').value,
                              CONTACT_NUMBER: row.querySelector('input[name="CONTACT_NUMBER"]').value,
                              ASSIGNMENT_DATE: row.querySelector('input[name="ASSIGNMENT_DATE"]').value || null,
                              
                              ASSIGNMENT_END_DATE: row.querySelector('input[name="ASSIGNMENT_END_DATE"]').value || null,
                              TRAFFIC_CODE_NO: row.querySelector('input[name="TRAFFIC_CODE_NO"]').value,
                              DRIVING_LICENSE_NO: row.querySelector('input[name="DRIVING_LICENSE_NO"]').value,
                              LICENSE_TYPE: row.querySelector('input[name="LICENSE_TYPE"]').value,
                              PLACE_OF_ISSUE: row.querySelector('input[name="PLACE_OF_ISSUE"]').value,
                              LICENSE_EXPIRY_DATE: row.querySelector('input[name="LICENSE_EXPIRY_DATE"]').value || null,
                              GPS_TAG_NO: row.querySelector('input[name="GPS_TAG_NO"]').value,
                              GPS_TAG_ASSIGN_DATE: row.querySelector('input[name="GPS_TAG_ASSIGN_DATE"]').value || null
                            };
                            driverData.push(driverRecord);
                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0;      i < fileInput.files.length; i++) {
                                formData.append(`DriverAttachments_${index}`, fileInput.files[i]);
                              }
                            }
                          });
                          formData.append('driver', JSON.stringify(driverData));

                          const allocationRows = document.querySelectorAll('#allocationTable tbody tr');
                          allocationRows.forEach((row, index) => {
                            const idInput = row.querySelector('input[name="allocation_id"]');
                            const allocationRecord = {
                              ALLOC_LINE_ID: idInput ? idInput.value : 'new',
                              COMPANY_NAME: row.querySelector('select[name="COMPANY NAME_LOOKUP_NAME"]').value,
                              DIVISION: row.querySelector('select[name="DIVISIONS_LOOKUP_NAME"]').value,
                              OPERATING_LOCATION: row.querySelector('select[name="OPERATING_LOCATION_ALLOCATION_LOOKUP_NAME"]').value,
                              OPERATING_EMIRATES: row.querySelector('select[name="AE_EMIRATES_LOOKUP_NAME"]').value,
                              ALLOCATION_DATE: row.querySelector('input[name="ALLOCATION_DATE"]').value || null,
                              
                              ALLOCATION_END_DATE: row.querySelector('input[name="ALLOCATION_END_DATE"]').value || null,
                            };
                            allocationData.push(allocationRecord);
                            const fileInput = row.querySelector('input[type="file"]');
                            if (fileInput && fileInput.files.length > 0) {
                              for (let i = 0; i < fileInput.files.length; i++) {
                                formData.append(`attachment_${index}`, fileInput.files[i]);
                              }
                            }
                          });
                          formData.append('allocation', JSON.stringify(allocationData));

                          try {
                            const response = await fetch('http://127.0.0.1:8000/api/fleet-master/save', {
                              method: 'POST',
                              body: formData
                            });

                            if (!response.ok) {
                              const errorText = await response.text();
                              console.error('Error response:', errorText);
                              throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                            }

                            const data = await response.json();
                            console.log('Success:', data);

                            alert(`Fleet master information saved successfully!\nHeader Id: ${data.fleet_master.HEADER_ID}`);
                            clearForm();
                          } catch (error) {
                            console.error('Detailed error:', error);
                            alert(`An error occurred while saving the information: ${error.message}`);
                          }
                        });

                        function areAllTablesFilled() {
                          const tables = ['insuranceTable', 'registrationTable', 'gpsTable', 'permitsTable', 'fuelTable', 'roadtollTable', 'driverTable', 'allocationTable'];
                          return tables.every(tableId => {
                            const table = document.getElementById(tableId);
                            const rows = table.querySelectorAll('tbody tr');
                            return Array.from(rows).some(row => {
                              const inputs = row.querySelectorAll('input:not([type="hidden"]), select');
                              return Array.from(inputs).some(input => input.value.trim() !== '');
                            });
                          });
                        }
                        
                        function clearForm() {
                          document.querySelectorAll('#vehicleForm input, #vehicleForm select, #vehicleForm textarea').forEach(input => {
                              if (input.type !== 'file') {
                                  input.value = '';
                              } else {
                                  // Clear file inputs
                                  input.value = '';
                                  // Clear any associated file name display
                                  const fileLabel = input.nextElementSibling;
                                  if (fileLabel && fileLabel.tagName === 'SPAN') {
                                      fileLabel.textContent = '';
                                  }
                              }
                            });

                            const vehiclePurchaseDocInput = document.querySelector('input[name="VehiclePurchaseDoc"]');
                          
                            if (vehiclePurchaseDocInput) {
                            vehiclePurchaseDocInput.addEventListener('change', function() {
                              handleFileSelection(this);
                            });
                            }

                            clearInsuranceTable();
                            clearPermitTable();
                            cleargpsTable();
                            clearFuelTable();

                            clearRegistrationTable();
                            clearRoadtollTable();
                            clearDriverTable();
                            clearAllocationTable();


                            enableEditingControls();
                            hideEditButton();
                            isPopulatedData = false;
                            enableAllFields();
                            const editButton = document.getElementById('editButton');
                            if (editButton) {
                              editButton.style.display = 'none';
                            }

                            isEditMode = false;
                            const fleetControlNumberField = document.querySelector('[name="FLEET_CONTROL_NO"]');
                            fleetControlNumberField.disabled = true;
                            fleetControlNumberField.value = '';

                       

                        }

                        function clearInsuranceTable() {
                          const insuranceTable = document.querySelector('#insuranceTable tbody');
                          insuranceTable.innerHTML = '';
                          //addInsuranceRow();
                        }

                        function clearRegistrationTable() {
                          const registrationTable = document.querySelector('#registrationTable tbody');
                          registrationTable.innerHTML = '';
                          //addregistrationRow();
                        }

                      function clearPermitTable() {
                          const permitTable = document.querySelector('#permitsTable tbody');
                          permitTable.innerHTML = '';
                          
                      }

                        function clearFuelTable() {
                          const fuelTable = document.querySelector('#fuelTable tbody');
                          fuelTable.innerHTML = '';
                          //addFuelRow();
                        }

                      function clearRoadtollTable() {
                          const roadtollTable = document.querySelector('#roadtollTable tbody');
                          roadtollTable.innerHTML = '';
                          //addRoadtollRow();
                      }

                        function clearDriverTable() {
                          const driverTable = document.querySelector('#driverTable tbody');
                          driverTable.innerHTML = '';
                          //addDriverRow();
                        }

                        function clearAllocationTable() {
                          const allocationTable = document.querySelector('#allocationTable tbody');
                          allocationTable.innerHTML = '';
                          //addAllocationRow();
                        }

                        function cleargpsTable() {
                          const gpsTable = document.querySelector('#gpsTable tbody');
                          gpsTable.innerHTML = '';
                          //addgpsRow();
                        }
                        
                      
                        function handleFileSelection(fileInput) {
                        const newFiles = fileInput.files;
                        let fileListContainer = fileInput.nextElementSibling;
                        let fileDropdown;
                      
                        if (!fileListContainer || !fileListContainer.classList.contains('file-list-container')) {
                          fileListContainer = document.createElement('div');
                          fileListContainer.className = 'file-list-container';
                          fileInput.parentNode.insertBefore(fileListContainer, fileInput.nextSibling);
                      
                          const wrapper = document.createElement('div');
                          wrapper.className = 'file-input-wrapper';
                          fileInput.parentNode.insertBefore(wrapper, fileInput);
                          wrapper.appendChild(fileInput);
                          wrapper.appendChild(fileListContainer);
                      
                          fileDropdown = createFileDropdown();
                          fileListContainer.appendChild(fileDropdown);
                        } else {
                          fileDropdown = fileListContainer.querySelector('.file-dropdown');
                        }
                      
                        const existingFiles = Array.from(fileDropdown.querySelectorAll('.file-item')).map(item => item.dataset.fileName);
                        const newFileNames = Array.from(newFiles).map(file => file.name);
                        
                        // Only add files that don't already exist
                        const filesToAdd = newFileNames.filter(fileName => !existingFiles.includes(fileName));
                      
                        for (let i = 0; i < filesToAdd.length; i++) {
                          const fileName = filesToAdd[i];
                          const fileItem = createFileItem(fileName, '', '', existingFiles.length + i);
                          fileDropdown.querySelector('.file-list').insertAdjacentHTML('beforeend', fileItem);
                        }

                        // Combine existing files and new files without duplicates
                        const allFiles = [...new Set([...existingFiles, ...filesToAdd])];

                        updateFileInput(fileInput, allFiles);
                        addRemoveFileListeners(fileDropdown, fileInput);
                        updateFileCount(fileInput, fileDropdown);
                      }



                      
                    

                      function createFileItem(fileName, modelName, instanceId, index) {
    const actualInstanceId = instanceId || document.querySelector('[name="HEADER_ID"]')?.value;
    
    return `
        <div class="file-item" data-file-name="${fileName}">
            <div class="file-content">
                <i class="fa-solid fa-paperclip file-icon"></i>
                <span class="file-name">${fileName}</span>
            </div>
            <div class="remove-file-container">
                <i class="fas fa-times remove-file" 
                   data-file-name="${fileName}" 
                   data-model="${modelName}" 
                   data-instance="${actualInstanceId}" 
                   data-index="${index}"></i>
            </div>
        </div>
    `;
}

                      function toggleFileList(event) {
                        const fileList = event.currentTarget.nextElementSibling;
                        fileList.style.display = fileList.style.display === 'none' ? 'block' : 'none';
                      }

                      function createFileDropdown() {
                        const dropdown = document.createElement('div');
                        dropdown.className = 'file-dropdown';
                        dropdown.innerHTML = `
                          <div class="dropdown-toggle">
                            <i class="fas fa-chevron-down"></i> <span class="file-count">file(s)</span>
                          </div>
                          <div class="file-list" style="display: none;"></div>
                        `;
                        dropdown.querySelector('.dropdown-toggle').addEventListener('click', toggleFileList);
                        return dropdown;
                      }
                      


                      function updateFileCount(fileInput, fileDropdown) {
                        const fileCount = fileDropdown.querySelectorAll('.file-item').length;
                        const fileCountSpan = fileDropdown.querySelector('.file-count');
                        fileCountSpan.textContent = `${fileCount} file(s)`;

                        const fileList = fileDropdown.querySelector('.file-list');
                        if (fileCount > 2) {
                          fileList.style.maxHeight = '150px';
                          fileList.style.overflowY = 'auto';
                        } else {
                          fileList.style.maxHeight = 'none';
                          fileList.style.overflowY = 'visible';
                        }
                      }







                      
                      
                      
                      function addRemoveFileListeners(fileListContainer, fileInput) {
                        fileListContainer.querySelectorAll('.remove-file').forEach(removeIcon => {
                          removeIcon.addEventListener('click', function() {
                            const fileName = this.dataset.fileName;
                            const modelName = this.dataset.model;
                            const instanceId = this.dataset.instance;
                            const index = this.dataset.index;

                            if (modelName && instanceId) {
                              deleteFile(modelName, instanceId, index, fileName);
                            } else {
                            const fileItem = this.closest('.file-item');
                            fileItem.remove();

                              const existingFiles = Array.from(fileListContainer.querySelectorAll('.file-item')).map(item => item.dataset.fileName);
                            updateFileInput(fileInput, existingFiles);
                              updateFileCount(fileInput, fileListContainer.querySelector('.file-dropdown'));
                            }
                          });
                        });
                      }




                      function updateFileInput(fileInput, fileNames) {
                        const dt = new DataTransfer();
                        const existingFiles = Array.from(fileInput.files);

                        fileNames.forEach(fileName => {
                          const file = existingFiles.find(f => f.name === fileName);
                          if (file && file.size > 0) {
                            dt.items.add(file);
                          } else if (fileName.trim() !== '') {
                            // Create a placeholder file for existing filenames
                            dt.items.add(new File([], fileName, { type: 'application/octet-stream' }));
                          }
                        });

                        fileInput.files = dt.files;
                      } 

                      

                     
                      

                      function addFileInputListeners() {
                        const fileInputs = document.querySelectorAll('input[type="file"]');
                        fileInputs.forEach(input => {
                          input.addEventListener('change', function () {
                            handleFileSelection(this);
                          });
                        });
                      }


                      function handleFileSelectionWrapper() {
                        handleFileSelection(this);
                      } 
                          
                        
                          function setupDropdownsForNewRow(row) {
                              setupTrafficSearchFunctionality(row);

                              row.querySelectorAll("select").forEach((dropdown) => {
                              const lookupName = dropdown.getAttribute("name").replace('_LOOKUP_NAME', '').trim();
                              if (lookupName) {
                                // Fetch dropdown options when clicked
                                dropdown.addEventListener("click", () => fetchDropdownOptions(lookupName, dropdown));
                              }
                              // Store the selected value as a data attribute for later use
                              dropdown.addEventListener("change", function () {
                                this.setAttribute("data-selected", this.value);
                              });
                            });
                          }

                         
                        
                          let insuranceFileInfo = [];
                          let activeInsuranceSearchInput = null;
                        
                           

                                  function addInsuranceRow() {
                                    const tbody = document.querySelector('#insuranceTable tbody');
                                    const newRow = tbody.insertRow();
                                    
                                    newRow.innerHTML = `
                                      <td>
                                        <input type="text" 
                                          class="form-control insurance-search-input" 
                                          name="INSURANCE_COMPANY"
                                          required
                                          data-required="true"
                                          autocomplete="off"
                                          autocorrect="off"
                                          autocapitalize="off"
                                          spellcheck="false"
                                          style="background-color: #ffff76; color: black"/>
                                        <div class="insurance-search-results-container" style="display: none;">
                                          <div class="insurance-search-results-header">
                                            <span>Insurance File Search Results</span>
                                            <span class="insurance-close-icon">&times;</span>
                                          </div>
                                          <table class="insurance-search-results">
                                            <thead>
                                              <tr>
                                                <th>Insurance Company</th>
                                                <th>Policy No</th>
                                                <th>Policy Date</th>
                                                <th>Policy Expiry Date</th>
                                              </tr>
                                            </thead>
                                            <tbody></tbody>
                                          </table>
                                        </div>
                                      </td>
                                      <td><input type="text" class="form-control" name="POLICY_NO" required data-required="true" style="background-color: #ffff76; color: black"/></td>
                                      <td><input type="date" class="form-control" name="POLICY_DATE" required data-required="true" style="background-color: #ffff76; color: black"/></td>
                                      <td><input type="date" class="form-control" name="POLICY_EXPIRY_DATE" required data-required="true" style="background-color: #ffff76; color: black"/></td>
                                      <td><input type="date" class="form-control" name="PLTS_INS_START_DATE" required data-required="true" style="background-color: #ffff76; color: black"/></td>
                                      <td><input type="date" class="form-control" name="PLTS_INS_EXPIRY_DATE" required data-required="true" style="background-color: #ffff76; color: black"/></td>
                                      <td><select class="form-control" name="CURRENT STATUS_LOOKUP_NAME" required data-required="true" style="background-color: #ffff76; color: black"><option value=""></option></select></td>
                                      <td><input type="file" class="form-control" name="InsurancePolicAattachment" /></td>
                                      <input type="hidden" name="insurance_id" value="new" />
                                      <input type="hidden" name="FLEET_PROCESS" value="Pending" />
                                    `;
                                  
                                    setupDropdownsForNewRow(newRow);
                                    setupValidation(newRow);
                                    addFileInputListeners();
                                    setupInsuranceSearchFunctionality(newRow);
                                  }
                                  

                                  function setupInsuranceSearchFunctionality(row) {
                                    const searchInput = row.querySelector('.insurance-search-input');
                                    if (!searchInput) {
                                      console.warn('Insurance search input not found in the row');
                                      return;
                                    }

                                    console.log('Setting up insurance search functionality for:', searchInput);

                                    searchInput.addEventListener('focus', (event) => {
                                      console.log('Focus event triggered on:', event.target);
                                      activeInsuranceSearchInput = searchInput;
                                    
                                      const fieldsToReset = ['INSURANCE_COMPANY', 'POLICY_NO', 'POLICY_DATE', 'POLICY_EXPIRY_DATE', ];
                                      fieldsToReset.forEach(fieldName => {
                                        const input = row.querySelector(`input[name="${fieldName}"]`);
                                        if (input) {
                                          input.readOnly = false;
                                          input.classList.remove('read-only-field');
                                        }
                                      });

                                      fetchAndPopulateInsuranceFileResults(searchInput);
                                    });

                                    searchInput.addEventListener('input', (event) => {
                                      console.log('Input event triggered on:', event.target);
                                      fetchAndPopulateInsuranceFileResults(searchInput);
                                    });
                                  }

                                  function initializeInsuranceFileInput() {
                                    console.log('Initializing insurance file input');
                                    const insuranceTable = document.getElementById('insuranceTable');
                                    if (insuranceTable) {
                                      const fileInputs = insuranceTable.querySelectorAll('input[type="file"]');
                                      console.log('Insurance file inputs:', fileInputs);
                                      fileInputs.forEach(input => {
                                        input.addEventListener('change', function() {
                                          console.log('Insurance file input changed');
                                          handleFileSelection(this);
                                        });
                                      });
                                    } else {
                                      console.warn('Insurance table not found');
                                    }
                                  }

                                  function reinitializeInsuranceFileInputs() {
                                    console.log('Reinitializing all insurance file inputs');
                                    addFileInputListeners();
                              initializeInsuranceFileInput();
                            }

                            const originalAddInsuranceRow = addInsuranceRow;
                            addInsuranceRow = function() {
                              originalAddInsuranceRow();
                              console.log('Insurance row added, reinitializing file inputs');
                              reinitializeInsuranceFileInputs();
                            };

                            const insuranceTableObserver = new MutationObserver((mutations) => {
                              mutations.forEach((mutation) => {
                                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                                  console.log('Insurance table changed, reinitializing file inputs');
                                  reinitializeInsuranceFileInputs();
                                }
                              });
                            });

                            document.addEventListener('DOMContentLoaded', function() {
                              console.log('DOM fully loaded');
                              reinitializeInsuranceFileInputs();

                              const insuranceTable = document.getElementById('insuranceTable');
                              if (insuranceTable) {
                                insuranceTableObserver.observe(insuranceTable, { childList: true, subtree: true });
                              }
                            });

                            const globalInsuranceSearchResults = document.getElementById('globalInsuranceSearchResults');
                            const closeInsuranceIcons = globalInsuranceSearchResults.querySelector('.insurance-close-icon');

                            closeInsuranceIcons.addEventListener('click', (e) => {
                              console.log('Close icon clicked');
                              e.stopPropagation();
                              hideInsuranceSearchResults();
                            });

                            document.addEventListener('click', (event) => {
                              if (!event.target.closest('.insurance-search-input') && !event.target.closest('#globalInsuranceSearchResults')) {
                                hideInsuranceSearchResults();
                              }
                            });

                            async function fetchAndPopulateInsuranceFileResults(searchInput) {
                              console.log('Fetching and populating insurance file results');
                              try {
                                await fetchInsuranceFileInfo();
                                filterAndDisplayInsuranceFileResults(searchInput);
                                showInsuranceSearchResults();
                              } catch (error) {
                                console.error('Error fetching insurance file info:', error);
                              }
                            }

                            function filterAndDisplayInsuranceFileResults(searchInput) {
                              console.log('Filtering and displaying insurance file results');
                              const searchTerm = searchInput.value.toLowerCase();
                              const filteredInfo = insuranceFileInfo.filter(info =>
                                info.INSURANCE_COMPANY.toLowerCase().includes(searchTerm)
                              );

                              console.log('Filtered info:', filteredInfo);

                              const searchResults = globalInsuranceSearchResults.querySelector('.insurance-search-results tbody');
                              searchResults.innerHTML = '';
                              filteredInfo.forEach((info) => {
                                const tr = document.createElement('tr');
                                tr.innerHTML = `
                                  <td>${info.INSURANCE_COMPANY}</td>
                                  <td>${info.POLICY_NO}</td>
                                  <td>${info.POLICY_DATE}</td>
                                  <td>${info.POLICY_EXPIRY_DATE}</td>
                                `;
                                tr.addEventListener('click', function (e) {
                                  console.log('Search result clicked');
                                  e.stopPropagation();
                                  populateInsuranceFields(activeInsuranceSearchInput, info);
                                  hideInsuranceSearchResults();
                                });
                                searchResults.appendChild(tr);
                              });
                            }

                            function showInsuranceSearchResults() {
                              console.log('Showing insurance search results');
                              globalInsuranceSearchResults.style.display = 'block';
                            }

                            function hideInsuranceSearchResults() {
                              console.log('Hiding insurance search results');
                              globalInsuranceSearchResults.style.display = 'none';
                            }

                            async function fetchInsuranceFileInfo() {
                              if (insuranceFileInfo.length === 0) {
                                console.log('Fetching insurance file info from API');
                                try {
                                  const response = await fetch('http://127.0.0.1:8000/api/insurance-info');
                                  if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                  }
                                  insuranceFileInfo = await response.json();
                                  console.log('Fetched insurance file info:', insuranceFileInfo);
                                } catch (error) {
                                  console.error('Error fetching insurance file info:', error);
                                }
                              } else {
                                console.log('Using cached insurance file info');
                              }
                              return insuranceFileInfo;
                            }

                            function populateInsuranceFields(searchInput, info) {
                              console.log('Populating insurance fields with:', info);
                              const row = searchInput.closest('tr');
                            
                              const fieldsToPopulate = [
                                { name: 'INSURANCE_COMPANY', value: info.INSURANCE_COMPANY },
                                { name: 'POLICY_NO', value: info.POLICY_NO },
                                { name: 'POLICY_DATE', value: info.POLICY_DATE },
                                { name: 'POLICY_EXPIRY_DATE', value: info.POLICY_EXPIRY_DATE },
                              ];

                              fieldsToPopulate.forEach(field => {
                                const input = row.querySelector(`input[name="${field.name}"]`);
                                if (input) {
                                  input.value = field.value;
                                  input.readOnly = true;
                                  input.classList.add('read-only-field');
                                }
                              });

                              const insuranceCompanyInput = row.querySelector('input[name="INSURANCE_COMPANY"]');
                              insuranceCompanyInput.addEventListener('focus', function() {
                                fieldsToPopulate.forEach(field => {
                                  const input = row.querySelector(`input[name="${field.name}"]`);
                                  if (input) {
                                    input.readOnly = false;
                                    input.classList.remove('read-only-field');
                                  }
                                });
                              });
                            }

                            document.addEventListener('DOMContentLoaded', () => {
                              console.log('DOM content loaded');
                              const existingRows = document.querySelectorAll('#insuranceTable tbody tr');
                              existingRows.forEach(row => setupInsuranceSearchFunctionality(row));
                            });


                            let trafficFileInfo = [];
                            let activeSearchInput = null;

                            // Function to add a new registration row with dynamic dropdowns
                            function addRegistrationRow() {
                                    const tbody = document.querySelector('#registrationTable tbody');
                                    const newRow = tbody.insertRow();

                                    // Create the HTML for the new row with dropdowns
                                    newRow.innerHTML = `
                                      <td>
                                            <input type="text" class="form-control traffic-search-input" name="EMIRATES_TRF_FILE_NO" required style="background-color: #ffff76; color: black"/>
                                          </td>  
                                      <td><input type="text" class="form-control" name="REGISTERED_EMIRATES" required /></td>
                                        
                                      <td><input type="text" class="form-control" name="FEDERAL_TRF_FILE_NO" required/></td>
                                      <td><input type="text" class="form-control" name="REG_COMPANY_NAME" required/></td>
                                      <td><input type="text" class="form-control" name="TRADE_LICENSE_NO" required/></td>
                                      <td><input type="text" class="form-control" name="REGISTRATION_NO1" style="background-color: #ffff76; color: black"/></td>
                                      <td><input type="text" class="form-control" name="REGISTRATION_NO" style="background-color: #ffff76; color: black"/></td>
                                      <td><input type="date" class="form-control" name="REGISTRATION_DATE" style="background-color: #ffff76; color: black"/></td>
                                      <td><input type="date" class="form-control" name="REG_EXPIRY_DATE" style="background-color: #ffff76; color: black" /></td>
                                      <td><select class="form-control" name="CURRENT STATUS_LOOKUP_NAME" style="background-color: #ffff76; color: black" ><option value=""></option></select> </td>
                                      <td><input type="file" class="form-control" name="RegCardAttachment"/></td>
                                      <input type="hidden" name="registration_id" value="new" />
                                    `;

                                    setupDropdownsForNewRow(newRow);
                                  setupValidation(newRow);
                                  addFileInputListeners();
                                  setupTrafficSearchFunctionality(newRow);
                            }

                            function setupTrafficSearchFunctionality(row) {
                              const searchInput = row.querySelector('.traffic-search-input');
                              if (!searchInput) {
                                console.warn('Traffic search input not found in the row');
                                return;
                              }

                              console.log('Setting up traffic search functionality for:', searchInput);

                              searchInput.addEventListener('focus', (event) => {
                                console.log('Focus event triggered on:', event.target);
                                activeSearchInput = searchInput;
                                
                                // Reset read-only state for all fields in this row
                                const fieldsToReset = ['EMIRATES_TRF_FILE_NO', 'REGISTERED_EMIRATES', 'FEDERAL_TRF_FILE_NO', 'REG_COMPANY_NAME', 'TRADE_LICENSE_NO'];
                                fieldsToReset.forEach(fieldName => {
                                  const input = row.querySelector(`input[name="${fieldName}"]`);
                                  if (input) {
                                    input.readOnly = false;
                                    input.classList.remove('read-only-field');
                                  }
                                });

                                fetchAndPopulateTrafficFileResults(searchInput);
                              });

                              searchInput.addEventListener('input', (event) => {
                                console.log('Input event triggered on:', event.target);
                                fetchAndPopulateTrafficFileResults(searchInput);
                              });
                            }


                            function setupValidation(row) {
                              console.log('Setting up validation for row:', row);
                              // Add your validation logic here if needed
                            }
                            
                            function initializeRegistrationFileInput() {
                              console.log('Initializing registration file input');
                              const registrationTable = document.getElementById('registrationTable');
                              if (registrationTable) {
                                const fileInputs = registrationTable.querySelectorAll('input[type="file"]');
                                console.log('Registration file inputs:', fileInputs);
                                fileInputs.forEach(input => {
                                  input.addEventListener('change', function() {
                                    console.log('Registration file input changed');
                                    handleFileSelection(this);
                                  });
                                });
                              } else {
                                console.warn('Registration table not found');
                              }
                            }
                            
                            function reinitializeFileInputs() {
                              console.log('Reinitializing all file inputs');
                              addFileInputListeners();
                              initializeRegistrationFileInput();
                            }
                            
                            // Modify the addRegistrationRow function
                            const originalAddRegistrationRow = addRegistrationRow;
                            addRegistrationRow = function() {
                              originalAddRegistrationRow();
                              console.log('Registration row added, reinitializing file inputs');
                              reinitializeFileInputs();
                            };
                            
                            // Add a mutation observer to watch for changes in the registration table
                            const registrationTableObserver = new MutationObserver((mutations) => {
                              mutations.forEach((mutation) => {
                                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                                  console.log('Registration table changed, reinitializing file inputs');
                                  reinitializeFileInputs();
                                }
                              });
                            });
                            
                            document.addEventListener('DOMContentLoaded', function() {
                              console.log('DOM fully loaded');
                              reinitializeFileInputs();
                            
                              const registrationTable = document.getElementById('registrationTable');
                              if (registrationTable) {
                                registrationTableObserver.observe(registrationTable, { childList: true, subtree: true });
                              }
                            });

                            const globalSearchResults = document.getElementById('globalTrafficSearchResults');
                            const closeIcons = globalSearchResults.querySelector('.traffic-close-icon');

                            closeIcons.addEventListener('click', (e) => {
                              console.log('Close icon clicked');
                              e.stopPropagation();
                              hideTrafficSearchResults();
                            });

                            document.addEventListener('click', (event) => {
                              if (!event.target.closest('.traffic-search-input') && !event.target.closest('#globalTrafficSearchResults')) {
                                hideTrafficSearchResults();
                              }
                            });

                            async function fetchAndPopulateTrafficFileResults(searchInput) {
                              console.log('Fetching and populating traffic file results');
                              try {
                                await fetchTrafficFileInfo();
                                filterAndDisplayTrafficFileResults(searchInput);
                                showTrafficSearchResults();
                              } catch (error) {
                                console.error('Error fetching traffic file info:', error);
                              }
                            }

                            function filterAndDisplayTrafficFileResults(searchInput) {
                              console.log('Filtering and displaying traffic file results');
                              const searchTerm = searchInput.value.toLowerCase();
                              const filteredInfo = trafficFileInfo.filter(info =>
                                info.TRAFFIC_FILE_NO.toLowerCase().includes(searchTerm)
                              );

                              console.log('Filtered info:', filteredInfo);

                              const searchResults = globalSearchResults.querySelector('.traffic-search-results tbody');
                              searchResults.innerHTML = '';
                              filteredInfo.forEach((info) => {
                                const tr = document.createElement('tr');
                                tr.innerHTML = `
                                  <td>${info.TRAFFIC_FILE_NO}</td>
                                  <td>${info.COMPANY_NAME}</td>
                                  <td>${info.TRADE_LICENSE_NO}</td>
                                  <td>${info.EMIRATES}</td>
                                  <td>${info.FEDERAL_TRAFFIC_FILE_NO}</td>
                                `;
                                tr.addEventListener('click', function (e) {
                                  console.log('Search result clicked');
                                  e.stopPropagation();
                                  populateTrafficRegistrationFields(activeSearchInput, info);
                                  hideTrafficSearchResults();
                                });
                                searchResults.appendChild(tr);
                              });
                            }

                            function showTrafficSearchResults() {
                              console.log('Showing traffic search results');
                              globalSearchResults.style.display = 'block';
                            }

                            function hideTrafficSearchResults() {
                              console.log('Hiding traffic search results');
                              globalSearchResults.style.display = 'none';
                            }


                            async function fetchTrafficFileInfo() {
                              if (trafficFileInfo.length === 0) {
                                console.log('Fetching traffic file info from API');
                                try {
                                  const response = await fetch('http://127.0.0.1:8000/api/traffic-file-info');
                                  if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                  }
                                  trafficFileInfo = await response.json();
                                  console.log('Fetched traffic file info:', trafficFileInfo);
                                } catch (error) {
                                  console.error('Error fetching traffic file info:', error);
                                }
                              } else {
                                console.log('Using cached traffic file info');
                              }
                              return trafficFileInfo;
                            }

                            

                            function populateTrafficRegistrationFields(searchInput, info) {
                              console.log('Populating traffic registration fields with:', info);
                              const row = searchInput.closest('tr');
                              
                              // Populate and make fields read-only
                              const fieldsToPopulate = [
                                { name: 'EMIRATES_TRF_FILE_NO', value: info.TRAFFIC_FILE_NO },
                                { name: 'REGISTERED_EMIRATES', value: info.EMIRATES },
                                { name: 'FEDERAL_TRF_FILE_NO', value: info.FEDERAL_TRAFFIC_FILE_NO },
                                { name: 'REG_COMPANY_NAME', value: info.COMPANY_NAME },
                                { name: 'TRADE_LICENSE_NO', value: info.TRADE_LICENSE_NO }
                              ];

                              fieldsToPopulate.forEach(field => {
                                const input = row.querySelector(`input[name="${field.name}"]`);
                                if (input) {
                                  input.value = field.value;
                                  input.readOnly = true;
                                  input.classList.add('read-only-field');
                                }
                                                          });

                              // Add event listener to EmiratesTrafficFileNumber input
                              const trafficFileInput = row.querySelector('input[name="EMIRATES_TRF_FILE_NO"]');
                              trafficFileInput.addEventListener('focus', function() {
                                // Remove read-only attribute when focused
                                fieldsToPopulate.forEach(field => {
                                  const input = row.querySelector(`input[name="${field.name}"]`);
                                  if (input) {
                                    input.readOnly = false;
                                    input.classList.remove('read-only-field');
                                  }
                                });
                              });
                            }


                            // Make sure this function is called when the page loads
                            document.addEventListener('DOMContentLoaded', () => {
                              console.log('DOM content loaded');
                              const existingRows = document.querySelectorAll('#registrationTable tbody tr');
                              existingRows.forEach(row => setupTrafficSearchFunctionality(row));
                            });



                            function addRoadtollRow() {
                                const tbody = document.querySelector('#roadtollTable tbody');
                                const newRow = tbody.insertRow();
                                newRow.innerHTML = `
                                  <td><select class="form-control" name="AE_EMIRATES_LOOKUP_NAME"><option value=""></option></select></td>
                                  <td><select class="form-control" name="TOLL TYPE_LOOKUP_NAME"><option value=""></option></select></td>
                                  <td><input type="number" class="form-control" name="ACCOUNT_NO" /></td>
                                  <td><input type="number" class="form-control" name="TAG_NO" /></td>
                                  <td><input type="date" class="form-control" name="ACTIVATION_DATE" /></td>
                                  
                                  <td><input type="date" class="form-control" name="ACTIVATION_END_DATE" /></td>
                                  <td><select class="form-control" name="CURRENT STATUS_LOOKUP_NAME"><option value=""></option></select></td>
                                  <td><input type="file" class="form-control" name="RoadtollAttachments" /></td>
                                  <input type="hidden" name="roadtoll_id" value="new" />
                                `;

                                setupDropdownsForNewRow(newRow);

                                const inputs = newRow.querySelectorAll('input[required], select[required]');
                                inputs.forEach(input => {
                                  input.addEventListener('blur', () => {
                                    validateRegistrationField(input);
                                  });
                                });

                                addFileInputListeners();
                            }

                            let driverInfo = [];
                            let activeDriverSearchInput = null;

                            function addDriverRow() {
                              const tbody = document.querySelector('#driverTable tbody');
                              const newRow = tbody.insertRow();
                              newRow.innerHTML = `
                                  <td>
                                  <input type="text" class="form-control driver-search-input" name="EMPLOYEE_NO" style="background-color: #ffff76; color: black" required/>
                                  <div class="driver-search-wrapper">
                                    <div class="driver-search-results-container" style="display: none;">
                                      <div class="driver-search-results-header">
                                        <span>Driver Search Results</span>
                                        <span class="driver-close-icon">&times;</span>
                                      </div>
                                      <table class="driver-search-results">
                                        <thead>
                                          <tr>
                                            <th>Emp No</th>
                                            <th>Emp Name</th>
                                            <th>Designation</th>
                                            <th>Contact No</th>
                                          </tr>
                                        </thead>
                                        <tbody></tbody>
                                      </table>
                                    </div>
                                  </div>
                                </td>

                                  <td><input type="text" class="form-control" name="EMPLOYEE_NAME" style="background-color: #ffff76; color: black"/></td>
                                  <td><input type="text" class="form-control" name="DESIGNATION" style="background-color: #ffff76; color: black"/></td>
                                  <td><input type="text" class="form-control" name="CONTACT_NUMBER" style="background-color: #ffff76; color: black"/></td>
                                  <td><input type="date" class="form-control" name="ASSIGNMENT_DATE" style="background-color: #ffff76; color: black"/></td>
                                  <td><input type="date" class="form-control" name="ASSIGNMENT_END_DATE" style="background-color: #ffff76; color: black"/></td>
                                  <td><input type="text" class="form-control" name="TRAFFIC_CODE_NO" /></td>
                                  <td><input type="text" class="form-control" name="DRIVING_LICENSE_NO" /></td>
                                  <td><input type="text" class="form-control" name="LICENSE_TYPE" /></td>
                                  <td><input type="text" class="form-control" name="PLACE_OF_ISSUE" /></td>
                                  <td><input type="date" class="form-control" name="LICENSE_EXPIRY_DATE" /></td>
                                  <td><input type="text" class="form-control" name="GPS_TAG_NO" /></td>
                                  <td><input type="date" class="form-control" name="GPS_TAG_ASSIGN_DATE" /></td>
                                  <td><input type="file" class="form-control" name="DriverAttachments"/></td>
                                  <input type="hidden" name="driver_id" value="new" />
                              `;

                              setupDropdownsForNewRow(newRow);
                                setupValidation(newRow);
                                addFileInputListeners();
                                setupDriverSearchFunctionality(newRow);
                            }

                            function setupDriverSearchFunctionality(row) {
                                const searchInput = row.querySelector('.driver-search-input');
                                if (!searchInput) {
                                    console.warn('Driver search input not found in the row');
                                    return;
                                }

                                console.log('Setting up driver search functionality for:', searchInput);

                                searchInput.addEventListener('focus', (event) => {
                                    console.log('Focus event triggered on:', event.target);
                                    activeDriverSearchInput = searchInput;

                                    const fieldsToReset = ['EMPLOYEE_NO', 'EMPLOYEE_NAME', 'DESIGNATION', 'CONTACT_NUMBER'];
                                    fieldsToReset.forEach(fieldName => {
                                        const input = row.querySelector(`input[name="${fieldName}"]`);
                                        if (input) {
                                            input.readOnly = false;
                                            input.classList.remove('read-only-field');
                                        }
                                    });

                                    fetchAndPopulateDriverResults(searchInput);
                                });

                                searchInput.addEventListener('input', (event) => {
                                    console.log('Input event triggered on:', event.target);
                                    fetchAndPopulateDriverResults(searchInput);
                                });
                            }

                            function setupValidation(row) {
                                console.log('Setting up validation for row:', row);
                            }

                            function initializeDriverFileInput() {
                                console.log('Initializing driver file input');
                                const driverTable = document.getElementById('driverTable');
                                if (driverTable) {
                                    const fileInputs = driverTable.querySelectorAll('input[type="file"]');
                                    console.log('Driver file inputs:', fileInputs);
                                    fileInputs.forEach(input => {
                                        input.addEventListener('change', function() {
                                            console.log('Driver file input changed');
                                            handleFileSelection(this);
                                        });
                                    });
                                } else {
                                    console.warn('Driver table not found');
                                }
                            }

                            function reinitializeFileInputs() {
                                console.log('Reinitializing all file inputs');
                              addFileInputListeners();
                                initializeDriverFileInput();
                            }

                            const originalAddDriverRow = addDriverRow;
                            addDriverRow = function() {
                                originalAddDriverRow();
                                console.log('Driver row added, reinitializing file inputs');
                                reinitializeFileInputs();
                            };

                            const driverTableObserver = new MutationObserver((mutations) => {
                                mutations.forEach((mutation) => {
                                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                                        console.log('Driver table changed, reinitializing file inputs');
                                        reinitializeFileInputs();
                                    }
                                });
                            });

                            document.addEventListener('DOMContentLoaded', function() {
                                console.log('DOM fully loaded');
                                reinitializeFileInputs();

                                const driverTable = document.getElementById('driverTable');
                                if (driverTable) {
                                    driverTableObserver.observe(driverTable, { childList: true, subtree: true });
                                }
                            });

                            const globalDriverSearchResults = document.getElementById('globalDriverSearchResults');
                            const DrivercloseIcon = globalDriverSearchResults.querySelector('.driver-close-icon');

                            DrivercloseIcon.addEventListener('click', (e) => {
                                console.log('Close icon clicked');
                                e.stopPropagation();
                                hideDriverSearchResults();
                            });

                            document.addEventListener('click', (event) => {
                                if (!event.target.closest('.driver-search-input') && !event.target.closest('#globalDriverSearchResults')) {
                                    hideDriverSearchResults();
                                }
                            });

                            async function fetchAndPopulateDriverResults(searchInput) {
                                console.log('Fetching and populating driver results');
                                try {
                                    await fetchDriverInfo();
                                    filterAndDisplayDriverResults(searchInput);
                                    showDriverSearchResults();
                                } catch (error) {
                                    console.error('Error fetching driver info:', error);
                                }
                            }

                            function filterAndDisplayDriverResults(searchInput) {
                                console.log('Filtering and displaying driver results');
                                const searchTerm = searchInput.value.toLowerCase();
                                const filteredInfo = driverInfo.filter(info =>
                                    info.EMPLOYEE_NO.toString().toLowerCase().includes(searchTerm)
                                );

                                console.log('Filtered info:', filteredInfo);

                                const searchResults = globalDriverSearchResults.querySelector('.driver-search-results tbody');
                                searchResults.innerHTML = '';
                                filteredInfo.forEach((info) => {
                                    const tr = document.createElement('tr');
                                    tr.innerHTML = `
                                        <td>${info.EMPLOYEE_NO}</td>
                                        <td>${info.EMPLOYEE_NAME}</td>
                                        <td>${info.DESIGNATION}</td>
                                        <td>${info.CONTACT_NUMBER}</td>
                                    `;
                                    tr.addEventListener('click', function (e) {
                                        console.log('Search result clicked');
                                        e.stopPropagation();
                                        populateDriverFields(activeDriverSearchInput, info);
                                        hideDriverSearchResults();
                                    });
                                    searchResults.appendChild(tr);
                                });
                            }

                            function showDriverSearchResults() {
                                console.log('Showing driver search results');
                                globalDriverSearchResults.style.display = 'block';
                            }

                            function hideDriverSearchResults() {
                                console.log('Hiding driver search results');
                                globalDriverSearchResults.style.display = 'none';
                            }

                            async function fetchDriverInfo() {
                                if (driverInfo.length === 0) {
                                    console.log('Fetching driver info from API');
                                    try {
                                        const response = await fetch('http://127.0.0.1:8000/api/driver-info');
                                        if (!response.ok) {
                                            throw new Error(`HTTP error! status: ${response.status}`);
                                        }
                                        driverInfo = await response.json();
                                        console.log('Fetched driver info:', driverInfo);
                                    } catch (error) {
                                        console.error('Error fetching driver info:', error);
                                    }
                                } else {
                                    console.log('Using cached driver info');
                                }
                                return driverInfo;
                            }

                            function populateDriverFields(searchInput, info) {
                                console.log('Populating driver fields with:', info);
                                const row = searchInput.closest('tr');

                                const fieldsToPopulate = [
                                    { name: 'EMPLOYEE_NO', value: info.EMPLOYEE_NO },
                                    { name: 'EMPLOYEE_NAME', value: info.EMPLOYEE_NAME },
                                    { name: 'DESIGNATION', value: info.DESIGNATION },
                                    { name: 'CONTACT_NUMBER', value: info.CONTACT_NUMBER }
                                ];

                                fieldsToPopulate.forEach(field => {
                                    const input = row.querySelector(`input[name="${field.name}"]`);
                                    if (input) {
                                        input.value = field.value;
                                        input.readOnly = true;
                                        input.classList.add('read-only-field');
                                    }
                                });

                                const employeeInput = row.querySelector('input[name="EMPLOYEE_NO"]');
                                employeeInput.addEventListener('focus', function() {
                                    fieldsToPopulate.forEach(field => {
                                        const input = row.querySelector(`input[name="${field.name}"]`);
                                        if (input) {
                                            input.readOnly = false;
                                            input.classList.remove('read-only-field');
                                        }
                                    });
                                });
                            }

                            document.addEventListener('DOMContentLoaded', () => {
                                console.log('DOM content loaded');
                                const existingRows = document.querySelectorAll('#driverTable tbody tr');
                                existingRows.forEach(row => setupDriverSearchFunctionality(row));
                            });

                            


                            function addAllocationRow() {
                              const tbody = document.querySelector('#allocationTable tbody');
                              const newRow = tbody.insertRow();
                              newRow.innerHTML = `
                                <td><select class="form-control" name="COMPANY NAME_LOOKUP_NAME"style="background-color: #ffff76; color: black"><option value=""></option></select></td>
                                <td><select class="form-control" name="DIVISIONS_LOOKUP_NAME"style="background-color: #ffff76; color: black"><option value=""></option></select></td>
                                <td><select class="form-control" name="OPERATING_LOCATION_ALLOCATION_LOOKUP_NAME"style="background-color: #ffff76; color: black"><option value=""></option></select></td>
                                <td><select class="form-control" name="AE_EMIRATES_LOOKUP_NAME"style="background-color: #ffff76; color: black"><option value=""></option></select></td>
                               
                                <td><input type="date" class="form-control" name="ALLOCATION_DATE" style="background-color: #ffff76; color: black" /></td>
                                
                                <td><input type="date" class="form-control" name="ALLOCATION_END_DATE" /></td>
                                <td><input type="file" class="form-control" name="attachment" /></td>
                                <input type="hidden" name="allocation_id" value="new" />
                              `;

                              setupDropdownsForNewRow(newRow);

                              const inputs = newRow.querySelectorAll('input[required], select[required]');
                              inputs.forEach(input => {
                                input.addEventListener('blur', () => {
                                  validateAllocationField(input);
                                });
                              });

                              addFileInputListeners();
                            }


                            function addFuelRow() {
                              const tbody = document.querySelector('#fuelTable tbody');
                              const newRow = tbody.insertRow();
                              newRow.innerHTML = `
                                <td><select class="form-control" name="FUEL TYPE_LOOKUP_NAME"><option value=""></option></select></td>
                                <td><input type="text" class="form-control" name="MONTHLY_FUEL_LIMIT"/></td>
                                <td><select class="form-control" name="FUEL SERVICE TYPE_LOOKUP_NAME"><option value=""></option></select></td>
                                <td><select class="form-control" name="FUEL SERVICE PROVIDER_LOOKUP_NAME"><option value=""></option></select></td>
                                <td><input type="text" class="form-control" name="FUEL_DOCUMENT_NO"/></td>
                                <td><input type="date" class="form-control" name="FUEL_DOCUMENT_DATE"/></td>
                                <td><input type="date" class="form-control" name="FUEL_DOC_EXPIRY_DATE"/></td>
                                <td><select class="form-control" name="CURRENT STATUS_LOOKUP_NAME"><option value=""></option></select></td>
                                <td><input type="file" class="form-control" name="FuelDocumentAttachment"/></td>
                                <input type="hidden" name="fuel_id" value="new" />
                              `;

                              setupDropdownsForNewRow(newRow);

                              const inputs = newRow.querySelectorAll('input[required], select[required]');
                              inputs.forEach(input => {
                                input.addEventListener('blur', () => {
                                  validateFuelField(input);
                                });
                              });

                              addFileInputListeners();
                            }

                      
                            function addgpsRow() {
                                    const tbody = document.querySelector('#gpsTable tbody');
                                    const newRow = tbody.insertRow();
                                    newRow.innerHTML = `
                                        <td><input type="text" class="form-control" name="GPS_DEVICE_NO" /></td>
                                        <td><input type="date" class="form-control" name="GPS_INSTALLATION_DATE" /></td>
                                        <td><input type="text" class="form-control" name="GPS_SERVICE_PROVIDER" /></td>
                                        <td><input type="file" class="form-control" name="GpsAattachment" /></td>
                                      <input type="hidden" name="gps_id" value="new" />
                                    `;
                                    addFileInputListeners();
                            }

                            function addPermitRow() {
                                    const tbody = document.querySelector('#permitsTable tbody');
                                    const newRow = tbody.insertRow();
                                    newRow.innerHTML = `
                                        <td><select class="form-control" name="PERMIT_LOOKUP_NAME" onchange="togglePermitColour(this)"><option value=""></option></select></td>
                                        <td><select class="form-control" name="AE_EMIRATES_LOOKUP_NAME"><option value=""></option></select></td>
                                        <td><select class="form-control" name="ISSUING AUTHORITY_LOOKUP_NAME"><option value=""></option></select></td>
                                        <td><input type="text" class="form-control" name="PERMIT_NO" /></td>
                                        <td><input type="date" class="form-control" name="PERMIT_DATE" /></td>
                                        <td><input type="date" class="form-control" name="PERMIT_EXPIRY_DATE" /></td>
                                        <td><select class="form-control" name="CURRENT STATUS_LOOKUP_NAME"><option value=""></option></select></td>
                                        <td class="permit-colour-cell"></td>
                                        <td class="attachment-cell">
                                            <input type="file" class="form-control" name="PermitAattachment" />
                                        </td>
                                        <input type="hidden" name="permit_id" value="new" />
                                    `;
                                    //  updatePermitColourHeader();
                                    togglePermitColour(newRow.querySelector('select[name="PERMIT_LOOKUP_NAME"]'));
                                    addFileInputListeners();
                                    setupDropdownsForNewRow(newRow);
                                  }

                                  function togglePermitColour(select) {
                                    const row = select.closest('tr');
                                    const permitColourCell = row.querySelector('.permit-colour-cell');

                                    if (select.value === 'Advertisement Card') {
                                        permitColourCell.innerHTML = '<input type="text" class="form-control" name="PermitColor" />';
                                        permitColourCell.classList.add('active');
                                        if (select.disabled) {
                                        permitColourCell.querySelector('input').disabled = true;
                                      }
                                    } else {
                                        permitColourCell.innerHTML = '';
                                        permitColourCell.classList.remove('active');
                                    }

                                    updatePermitColourHeader();
                                  }

                                  function updatePermitColourHeader() {
                                    const permitColourHeader = document.querySelector('.permit-colour-header');
                                    const visiblePermitColourInputs = document.querySelectorAll('.permit-colour-cell.active');

                                    permitColourHeader.classList.toggle('active', visiblePermitColourInputs.length > 0);
                            }

                            document.getElementById('addRow').addEventListener('click', function () {
                              if (isPopulatedData && !isEditMode) {
                                alert("Please enable editing first.");
                                  return;
                              }
                              const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');

                                switch(activeTab) {
                                  case 'insurance':
                                    addInsuranceRow();
                                    break;
                                  case 'permits':
                                    addPermitRow();
                                    break;
                                  case 'gps':
                                    addgpsRow();
                                    break;
                                  case 'registration':
                                    addRegistrationRow();
                                    break;
                                  case 'fuel':
                                    addFuelRow();
                                    break;
                                  case 'roadtoll':
                                    addRoadtollRow();
                                    break;
                                  case 'driver':
                                    addDriverRow();
                                    break;
                                  case 'allocation':
                                    addAllocationRow();
                                    break;
                                }
                            });

                            document.getElementById('removeRow').addEventListener('click', function() {
                                    if (isPopulatedData && !isEditMode) {
                                      alert("Please enable editing first.");
                                      return;
                                    }

                                    const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
                                    let tbody;


                                    console.log('Active tab:', activeTab);

                                    switch(activeTab) {
                                      case 'insurance':
                                        tbody = document.querySelector('#insuranceTable tbody');
                                        break;
                                      case 'permits':
                                        tbody = document.querySelector('#permitsTable tbody');
                                        break;
                                      case 'gps':
                                        tbody = document.querySelector('#gpsTable tbody');
                                        break;
                                      case 'registration':
                                        tbody = document.querySelector('#registrationTable tbody');
                                        break;
                                      case 'fuel':
                                        tbody = document.querySelector('#fuelTable tbody');
                                        break;
                                      case 'roadtoll':
                                        tbody = document.querySelector('#roadtollTable tbody');
                                        break;
                                      case 'driver':
                                        tbody = document.querySelector('#driverTable tbody');
                                        break;
                                      case 'allocation':
                                        tbody = document.querySelector('#allocationTable tbody');
                                        break;
                                    }

                                    console.log('Selected tbody:', tbody);

                                    if (tbody && tbody.rows.length > 0) {
                                      const lastRow = tbody.rows[tbody.rows.length - 1];
                                      const inputs = lastRow.querySelectorAll('input, select');
                                      let isEmpty = true;

                                      console.log('Number of inputs in last row:', inputs.length);

                                      for (let input of inputs) {
                                        console.log('Input value:', input.value);
                                        if (input.value.trim() !== '' && input.type !== 'hidden') {
                                          isEmpty = false;
                                          break;
                                        }
                                      }

                                      console.log('Is row empty:', isEmpty);

                                      if (isEmpty) {
                                        tbody.deleteRow(-1);
                                        console.log('Row deleted');
                                      } else {
                                        alert('Cannot delete row with data. Please clear the row first.');
                                      }
                                    } else {
                                      console.log('No rows to delete');
                                    }
                            });

                            document.getElementById('newForm').addEventListener('click', function() {
                              clearForm();
                              location.reload();
                              isEditMode = true; // This will refresh the page
                            });


                            function debounce(func, wait) {
                              let timeout;
                              return function executedFunction(...args) {
                                  const later = () => {
                                      clearTimeout(timeout);
                                      func(...args);
                                  };
                                  clearTimeout(timeout);
                                  timeout = setTimeout(later, wait);
                              };
                            }
        
                            function setupDeleteListeners() {
                              document.querySelectorAll('.remove-file').forEach(removeIcon => {
                                  removeIcon.addEventListener('click', debounce(function(event) {
                                      const modelName = event.target.dataset.model;
                                      const instanceId = event.target.dataset.instance;
                                      const fileIndex = event.target.dataset.index;
                                      const fileName = event.target.dataset.fileName;
        
                                      deleteFile(modelName, instanceId, fileIndex, fileName);
                                  }, 250));
                              });
                            }
        
                      //       async function deleteFile(modelName, instanceId, fileIndex, fileName) {
                      //   console.log(`Attempting to delete file: ${fileName} from ${modelName}`);
                      //   if (confirm(`Are you sure you want to delete ${fileName}?`)) {
                      //       try {
                      //           const response = await fetch(`/api/delete-file/${modelName}/${instanceId}/${fileIndex}`, {
                      //               method: 'DELETE',
                      //           });
                      //           const data = await response.json();
                      //           console.log('Server response:', data);
                      //           if (response.ok) {
                      //               console.log('File deletion successful on server');
                      //               const fileItems = document.querySelectorAll('.file-item');
                      //               const fileItem = Array.from(fileItems).find(item => {
                      //                   const removeIcon = item.querySelector('.remove-file');
                      //                   return removeIcon &&
                      //                         removeIcon.dataset.fileName === fileName &&
                      //                         removeIcon.dataset.model === modelName &&
                      //                         removeIcon.dataset.instance === instanceId;
                      //               });
  
                      //               console.log('File item to remove:', fileItem);
                      //               if (fileItem) {
                      //                   fileItem.remove();
                      //                   console.log('File item removed from DOM');
                      //               } else {
                      //                   console.log('File item not found in DOM');
                      //               }
                      //               alert("File deleted successfully");
                      //               document.dispatchEvent(new CustomEvent('fileDeleted', { detail: { modelName, instanceId, fileName } }));
                      //               console.log('Custom event dispatched');
                      //           } else {
                      //               console.error("Error deleting file:", data.message);
                      //               alert("Error deleting file. Please try again.");
                      //           }
                      //       } catch (error) {
                      //           console.error('Error:', error);
                      //           alert("An error occurred while deleting the file. Please try again.");
                      //       }
                      //     }
                      // }
                      async function deleteFile(modelName, instanceId, fileIndex, fileName) {
                                console.log(`Attempting to delete file: ${fileName} from ${modelName}`);
                                
                                if (confirm(`Are you sure you want to delete ${fileName}?`)) {
                                    try {
                                        const response = await fetch(`/api/delete-file/${modelName}/${instanceId}/${fileIndex}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        });

                                        const data = await response.json();
                                        console.log('Server response:', data);

                                        if (response.ok) {
                                            console.log('File deletion successful on server');
                                            
                                            // Find and remove the file item from DOM
                                            const fileItems = document.querySelectorAll('.file-item');
                                            const fileItem = Array.from(fileItems).find(item => {
                                                const removeIcon = item.querySelector('.remove-file');
                                                return removeIcon && 
                                                      removeIcon.dataset.fileName === fileName && 
                                                      removeIcon.dataset.model === modelName && 
                                                      removeIcon.dataset.instance === instanceId;
                                            });

                                            console.log('File item to remove:', fileItem);
                                            if (fileItem) {
                                                fileItem.remove();
                                                console.log('File item removed from DOM');
                                            } else {
                                                console.log('File item not found in DOM');
                                            }

                                            // Show success notification
                                            alert("File deleted successfully");

                                            // Dispatch event for other components
                                            document.dispatchEvent(new CustomEvent('fileDeleted', { 
                                                detail: { 
                                                    modelName, 
                                                    instanceId, 
                                                    fileName,
                                                    fileIndex 
                                                } 
                                            }));
                                            console.log('Custom event dispatched');

                                            // Optional: Refresh the file list or specific section
                                            // location.reload();
                                            
                                        } else {
                                            console.error("Error deleting file:", data.message);
                                            alert("Error deleting file. Please try again.");
                                        }
                                    } catch (error) {
                                        console.error('Error:', error);
                                        alert("An error occurred while deleting the file. Please try again.");
                                    }
                                }
                            }



                            function getActiveDataTables() {
                              const activeTables = [];
                              const tables = ['insurance', 'registration', 'gps', 'permits', 'fuel', 'roadtoll', 'driver', 'allocation'];
        
                              tables.forEach(table => {
                                if (document.querySelector(`#${table}Table tbody tr`)) {
                                  activeTables.push(table);
                                }
                              });
        
                              return activeTables;
                            }
        
                            function validateGpsTable() {
                              const gpsRows = document.querySelectorAll('#gpsTable tbody tr');
                              let isValid = true;
        
                              gpsRows.forEach((row) => {
                                const fields = ['GPS_DEVICE_NO', 'GPS_INSTALLATION_DATE', 'GPS_SERVICE_PROVIDER'];
                                fields.forEach(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                                  if (!input.value.trim()) {
                                    isValid = false;
                                    input.classList.add('is-invalid');
                                  } else {
                                    input.classList.remove('is-invalid');
                                  }
                                });
                              });
        
                              return {
                                isValid,
                                errorMessage: isValid ? '' : 'Please fill in all required fields in the Gps Info.'
                              };
                            }


                            function validateRegistrationField(input) {
                              if (!input.value.trim()) {
                                input.classList.add('is-invalid');
                                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('invalid-feedback')) {
                                  const errorMessage = document.createElement('div');
                                  errorMessage.className = 'invalid-feedback';
                                  errorMessage.textContent = `${input.name} is required`;
                                  input.parentNode.insertBefore(errorMessage, input.nextSibling);
                                }
                                return false;
                              } else {
                                input.classList.remove('is-invalid');
                                if (input.nextElementSibling && input.nextElementSibling.classList.contains('invalid-feedback')) {
                                  input.nextElementSibling.remove();
                                }
                                return true;
                              }
                            }

        
                            function validatePermitsTable() {
                              const permitsRows = document.querySelectorAll('#permitsTable tbody tr');
                              let isValid = true;
        
                              permitsRows.forEach((row) => {
                                const fields = [
                                  'PERMIT_LOOKUP_NAME',
                                  'AE_EMIRATES_LOOKUP_NAME',
                                  'ISSUING AUTHORITY_LOOKUP_NAME',
                                  'PERMIT_NO',
                                  'PERMIT_DATE',
                                  'PERMIT_EXPIRY_DATE',
                                  'CURRENT STATUS_LOOKUP_NAME'
                                ];
                                fields.forEach(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                                  if (input && !input.value.trim()) {
                                    isValid = false;
                                    input.classList.add('is-invalid');
                                  } else if (input) {
                                      input.classList.remove('is-invalid');
                                    }
                                });
                              });
        
                              return {
                                isValid,
                                errorMessage: isValid ? '' : 'Please fill in all required fields in the Permit Info.'
                              };
                            }
        
                            function validateFuelTable() {
                              const fuelRows = document.querySelectorAll('#fuelTable tbody tr');
                              let isValid = true;
        
                              fuelRows.forEach((row) => {
                                const fields = [
                                  'FUEL TYPE_LOOKUP_NAME',
                                  'MONTHLY_FUEL_LIMIT',
                                  'FUEL SERVICE TYPE_LOOKUP_NAME',
                                  'FUEL SERVICE PROVIDER_LOOKUP_NAME',
                                  'FUEL_DOCUMENT_NO',
                                  'FUEL_DOCUMENT_DATE',
                                  'FUEL_DOC_EXPIRY_DATE',
                                  'CURRENT STATUS_LOOKUP_NAME'
                                ];
        
                                fields.forEach(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                                  if (input && !input.value.trim()) {
                                    isValid = false;
                                    input.classList.add('is-invalid');
                                  } else if (input) {
                                    input.classList.remove('is-invalid');
                                  }
                                });
                              });
        
                              return {
                                isValid,
                                errorMessage: isValid ? '' : 'Please fill in all required fields in the Fuel Info.'
                              };
                            }
        
                            function validateRoadtollTable() {
                              const roadtollRows = document.querySelectorAll('#roadtollTable tbody tr');
                              let isValid = true;
        
                              roadtollRows.forEach((row) => {
                                const fields = ['EMIRATES', 'TOLL_TYPE', 'ACCOUNT_NO', 'TAG_NO', 'ACTIVATION_DATE','ACTIVATION_END_DATE', 'CURRENT_STATUS'];
                                fields.forEach(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                                  if (input && !input.value.trim()) {
                                    isValid = false;
                                    input.classList.add('is-invalid');
                                  } else if (input) {
                                    input.classList.remove('is-invalid');
                                  }
                                });
                              });
        
                              return {
                                isValid,
                                errorMessage: isValid ? '' : 'Please fill in all required fields in the Road-Toll Info.'
                              };
                            }
        
                            function validateDriverTable() {
                              const driverRows = document.querySelectorAll('#driverTable tbody tr');
                              let isValid = true;
        
                              driverRows.forEach((row) => {
                                const fields = ['EMPLOYEE_NO', 'EMPLOYEE_NAME', 'DESIGNATION', 'CONTACT_NUMBER', 'ASSIGNMENT_DATE' ,'TRAFFIC_CODE_NO', 'DRIVING_LICENSE_NO', 'LICENSE_TYPE', 'PLACE_OF_ISSUE', 'LICENSE_EXPIRY_DATE', 'GPS_TAG_NO', 'GPS_TAG_ASSIGN_DATE'];
                                fields.forEach(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                                  if (!input.value.trim()) {
                                    isValid = false;
                                    input.classList.add('is-invalid');
                                  } else {
                                    input.classList.remove('is-invalid');
                                  }
                                });
                              });
        
                              return {
                                isValid,
                                errorMessage: isValid ? '' : 'Please fill in all required fields in the Driver Table.'
                              };
                            }
        
                            function validateAllocationTable() {
                              const allocationRows = document.querySelectorAll('#allocationTable tbody tr');
                              let isValid = true;
        
                              allocationRows.forEach((row) => {
                                const fields = [
                                  'COMPANY NAME_LOOKUP_NAME',
                                  'DIVISIONS_LOOKUP_NAME',
                                  'OPERATING_LOCATION_ALLOCATION_LOOKUP_NAME',
                                  'AE_EMIRATES_LOOKUP_NAME',
                                 
                                  'ALLOCATION_DATE',
                                  'ALLOCATION_END_DATE'
                                ];
        
                                fields.forEach(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                                  if (input && !input.value.trim()) {
                                    isValid = false;
                                    input.classList.add('is-invalid');
                                  } else if (input) {
                                    input.classList.remove('is-invalid');
                                  }
                                });
                              });
        
                              return {
                                isValid,
                                errorMessage: isValid ? '' : 'Please fill in all required fields in the Allocation Info.'
                              };
                            }
        
                            function validateInsuranceTable() {
                              const insuranceRows = document.querySelectorAll('#insuranceTable tbody tr');
                              let isValid = true;
                              insuranceRows.forEach((row) => {
                                const fields = [
                                  'INSURANCE_COMPANY',
                                  'POLICY_NO',
                                  'POLICY_DATE',
                                  'POLICY_EXPIRY_DATE',
                                ];
        
                                fields.forEach(field => {
                                  const input = row.querySelector(`[name="${field}"]`);
                            if (input && !input.value.trim()) {
                                    isValid = false;
                                    input.classList.add('is-invalid');
                            } else if (input) {
                                      input.classList.remove('is-invalid');
                                    }
                                });
                              });
                              return {
                                isValid,
                                errorMessage: isValid ? '' : 'Please fill in all required fields in the Insurance Info.'
                              };
                            }
        
                            function validateRegistrationTable() {
                                    const registrationRows = document.querySelectorAll('#registrationTable tbody tr');
                                    let isValid = true;
        
                                    registrationRows.forEach((row) => {
                                      const fields = [
                                        'EMIRATES_TRF_FILE_NO',
                                        'REGISTERED_EMIRATES',
                                        'FEDERAL_TRF_FILE_NO',
                                        'REG_COMPANY_NAME',
                                        'TRADE_LICENSE_NO',
                                      ];
        
                                      fields.forEach(field => {
                                        const input = row.querySelector(`[name="${field}"]`);
                                        if (input && !input.value.trim()) {
                                          isValid = false;
                                          input.classList.add('is-invalid');
                                        } else if (input) {
                                          input.classList.remove('is-invalid');
                                        }
                                      });
                                    });
        
                                    return {
                                      isValid,
                                      errorMessage: isValid ? '' : 'Please fill in all required fields in the Registration Info.'
                                    };
                            }
      
  
    