import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminAgreement.scss';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import AdminAgree from './AdminAgree';

const AdminAgreement = () => {
  // const sigCanvas = useRef(null);
  const [signature, setSignature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    guidelineAgreement: false,
    feesAgreement: false,
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const canvasRef = useRef(null);
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user'); // Retrieve user ID from local storage
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file); // Store the actual file
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          drawImageOnCanvas(image);
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImageOnCanvas = (image) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const aspectRatio = image.width / image.height;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.width / aspectRatio;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  };

  const handleClear = () => {
    setUploadedFile(null);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(dataURL);
  };
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target; // Destructure id and checked properties
    setCheckboxes((prev) => ({ ...prev, [id]: checked })); // Update the checkbox state
  };

  const handleSubmit = async (e) => {
    if (isLoading) return;
    e.preventDefault();

    // If either checkbox is unchecked
    if (!checkboxes.guidelineAgreement || !checkboxes.feesAgreement) {
      // Mark the checkboxes as error
      const guidelineCheckbox = document.getElementById('guidelineAgreement');
      const feesCheckbox = document.getElementById('feesAgreement');

      let scrolledTo = false; // To ensure only the first unchecked checkbox scrolls

      // Add error styles and scroll if necessary
      if (!checkboxes.guidelineAgreement) {
        guidelineCheckbox.closest('.check').classList.add('error-checkbox');
        if (!scrolledTo) {
          guidelineCheckbox.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          scrolledTo = true; // Set scroll flag
        }
      } else {
        guidelineCheckbox.closest('.check').classList.remove('error-checkbox');
      }

      if (!checkboxes.feesAgreement) {
        feesCheckbox.closest('.check').classList.add('error-checkbox');
        if (!scrolledTo) {
          feesCheckbox.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      } else {
        feesCheckbox.closest('.check').classList.remove('error-checkbox');
      }

      // Display a toast notification
      Toastify({
        text: "Please agree to all guidelines and fees!",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "red",
      }).showToast();

      return;
    }

    if (uploadedFile && userId) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', uploadedFile);
        formData.append('userId', userId);

        // Make the API request to upload the image
        const uploadResponse = await axios.post('http://18.209.91.97:5001/api/sign/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Image uploaded successfully:', uploadResponse.data);

        Toastify({
          text: "Image uploaded successfully!",
          duration: 3000,
          gravity: "top",
          position: 'right',
          backgroundColor: "green",
        }).showToast(); // Notify user on success

        // After successful image upload, generate the PDF
        const pdfResponse = await axios.post('http://18.209.91.97:5001/generate-pdf', { userId });

        console.log('PDF generated successfully:', pdfResponse.data);
        const { pdfUrl } = pdfResponse.data;  // Extract the PDF URL from the response

        // Make a PUT request to update the PDF URL in the database
        const updatePdfResponse = await axios.put('http://18.209.91.97:5001/api/sign/update-pdf', {
          userId,
          pdf: pdfUrl,  // Send the PDF URL along with the userId
        });

        console.log('PDF URL updated successfully:', updatePdfResponse.data);
        const params = new URLSearchParams(location.search);
        const bookingId = params.get('bookingId');
        navigate(`/payment?bookingId=${bookingId}`);

      } catch (error) {
        console.error('Error:', error);
        Toastify({
          text: error.response?.data?.message || "Error occurred. Please try again.",
          duration: 3000,
          gravity: "top",
          position: 'right',
          backgroundColor: "red",
        }).showToast();
      } finally {
        setIsLoading(false);
      }
    } else {
      Toastify({
        text: "Please upload an image and ensure user ID is available before submitting.",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "orange",
      }).showToast();
    }
  };

  return (
    <>
      <div className='Agree'>
        <div className='user-details'>
          <h1 className="agreement" style={{ fontWeight: '700', textDecoration: 'underline', textAlign: 'center', margin: '3.5% 0%', fontSize: '3.5rem' }}>Agreement</h1>
          <p className='aa'>
            All deliveries will be made in the afternoon, starting from 2 PM, unless otherwise arranged.
            The exact delivery time will correspond to your reservation. All pickups are scheduled for 8 AM unless
            specified differently. Kindly ensure the cart is ready and fully charged by this time. If the cart is not
            at the designated drop-off location by 8 AM, an additional fee of $75 will be charged for the driver to
            make a return trip.
          </p>
        </div>
        <div className='aaa'>
          <p>
            The valid and collectible liability insurance and personal injury protection insurance of any authorized
            rental or leasing driver shall serve as the primary coverage for the liability and personal injury protection
            limits required under Sections 324.021(7) and 627.736 of the Florida Statutes. Failure to return rented
            property or equipment upon the expiration of the rental period, as well as failure to pay all amounts due
            &#x28; including costs for damages &#x29;, constitutes prima facie evidence of intent to defraud and is punishable
            in accordance with Section 812.155 of the Florida Statutes.
          </p>
        </div>
        <div>
          The Renter(s) attest that he/she is of at least 21 years of age and that he/she possesses a valid driver’s license and insurance as
          required by law. The operator(s)/renter(s) represents and warrants that he/she is insured under a policy of insurance which
          would  provide coverage or injuries to the operator/renter and medical bills incurred as well as for damage to the person and
          property of  others should an accident occur during the operation or use of the rented vehicle. The operator(s)/renter(s) attest that no other person shall drive the rental vehicle mentioned herein during the terms of this rental agreement or while rental
          vehicle is in  possession of renter except for the authorized drivers .
          Notice: Rental and leasing drivers insurance to be primary. The valid and collective liability insurance and personal injury
          protection insurance of any authorized rental or leasing driver is primary to the limits of liability and personal injury coverage
          required by SS.324.021(7) and 627.736, Florida Statutes.
          -You are hereby notified that by signing this contract below, you agree that your own liability, personal injury protection and
          comp/collision will provide primary insurance coverage up to its full policy limits.
          -The renter agrees to return the rental property, or have ready for return, at the initial delivery address immediately upon
          completion of the rental period in condition equal to that in which it was received with normal wear and tear accepted. The renter  agrees that if he or she has not returned said vehicle within 1 hour of the agreed upon time and at the above mentioned
          and agreed  upon address, or is the vehicle is abandoned, he or she will bear all expenses incurred by South Walton Carts LLC
          in attempting  to locate and recover said vehicle, and hereby waves all recourse against South Walton Carts LLC or other
          authority responsible for renter’s arrest or prosecution, even though the renter may consider such arrest or prosecution to be
          false,  malicious or unjust.
          -In the event that the rental property becomes unsafe or in a state of disrepair, the Renter agrees to immediately discontinue use
          of property, and promptly notify South Walton Carts LLC. The renter understands that in the event the property shall become
          inoperable through no fault of the renter, South Walton Carts LLC will take reasonable steps to have the vehicle repaired or
          replaced. In the event a replacement is not available, the Rentor at his discretion may modify the rental agreement to reflect an
          adjustment of price on aprorated basis.
          -The renter(s)/operator(s) understand that a Low Speed Vehicle is a motorized vehicle that is only permitted on roads of 35 mph or less and ALL TRAFFIC LAWS MUST BE OBEYED. The renter(s)/operator(s) represent and warrant that
          he/she is familiar with the traffic rules, laws and regulations of the municipality wherein the
          rented vehicle is to be operated and will at all times comply strictly with the same. No driver under the age of 21 years
          old  is allowed to drive.
        </div>
        <div>
          <h4>Other Terms :</h4>
          <ul>
            <li>
              Acknowledgment of Receipt: The renter acknowledges receipt of the described personal property.
              Both parties agree that the renter inspected and accepted the property at the time of delivery,
              confirming it was in good and serviceable condition.
            </li>
            <li>
              Liability for Loss or Damage: The renter agrees to pay for any loss or damage to the rental property, including
              all associated parts, attachments, keys, and tires. Tampering with, altering, or replacing any parts or
              components of the rental property is prohibited. If the rental property is found to have been tampered with
              or altered, the renter agrees to cover all repair costs and any costs associated with restoring the property,
              including loss of use. The renter's credit card or purchase order will be charged for any damages, theft, or
              loss on a “cash on demand” basis, up to the value of the rental property. Rental fees will continue to accrue
              until the lost rental property is paid in full.
            </li>
            <li>
              Unauthorized or Misuse of Vehicle: If an unauthorized or underage driver operates the vehicle, or if
              the vehicle is misused resulting in damage or injury, all vehicles listed in this contract will
              be picked up, and no refund will be provided for the rental.
            </li>
            <li>
              Vehicle Charge Responsibility: The renter accepts the rental property in its current state and is
              responsible for maintaining the proper charge of the vehicle. The vehicle must be returned fully
              charged. If not, a one-day rental fee of $125 will be charged to the renter's credit card.
            </li>
            <li>
              Title and Ownership: The title to the rented property remains with the Rentor at all times. The renter acknowledges that they do not become an agent, servant, or employee of the Rentor. The vehicle is the rightful property of the Rentor, even if registered in a third party’s name. The Rentor is neither the manufacturer of the property nor its agent and does not provide a warranty against defects. The Rentor is not liable for any loss, delay, or damage resulting from defects or accidental breakage.
            </li>
            <li>
              Seizure or Legal Actions: The renter must immediately notify the Rentor of any attempted levy or
              seizure of the rental property and indemnify the Rentor against losses or damages, including
              reasonable attorney fees and expenses.
            </li>
            <li>
              - Indemnification: The renter agrees to indemnify and hold the Rentor harmless against any losses,
              damages, expenses, or penalties arising from any actions causing injury to persons or property
              during the rental period. The renter waives and releases the Rentor from all claims for injuries
              or damages caused by the use of the rental property.
            </li>
            <li>- Legal Costs: Should collection or litigation become necessary to collect for damages or loss,
              the renter agrees to pay all fees, including attorney fees and court costs. Any claim under
              this agreement will be settled under Florida law, specifically in Okaloosa-Walton Counties.
              Walton County, FL will be the location for any arbitration or court settlement.
            </li>
            <li>
              Renter’s Conduct: The renter agrees to exercise extreme caution while operating the rented vehicle,
              particularly during inclement weather, on crowded roadways, or in hazardous situations. The renter
              will not consume alcohol or engage in illegal activities while operating the vehicle. The renter
              understands that severe injuries may occur if an accident happens, and seat belts must be worn at
              all times. If observed operating the vehicle carelessly or dangerously, the renter will forfeit
              any deposit and assume any fines or penalties.
            </li>
            <li>
              Severability: Should any paragraph or provision of this agreement violate the law and be unenforceable
              , the remainder of the agreement will remain valid.
            </li>
          </ul>
          <p>
            By signing below, the renter agrees to adhere to the terms and conditions of this rental agreement,
            including all associated fees and charges.
          </p>
        </div>
        <div>
          You are responsible for any injury, damage, or loss caused to others. You agree to provide liability,
          collision, and comprehensive insurance that covers you, us, and the vehicle. If state law requires us to
          provide auto liability insurance, or if you do not have auto liability insurance, we will provide auto
          liability insurance (the “Policy”) that is secondary to any other valid and collectible insurance, whether
          primary, secondary, excess, or contingent. The Policy offers bodily injury and property damage liability
          coverage up to the minimum levels mandated by the vehicular financial responsibility laws of the state
          whose laws apply to the loss. You and we reject PIP, medical payments, no-fault, and uninsured or
          under-insured motorist coverage, where permitted by law. The Policy is void if you breach this agreement
          or fail to cooperate in a loss investigation conducted by us or our insurer. Allowing an unauthorized
          driver to operate the vehicle will also terminate coverage under the Policy.
        </div>
        <div>
          <h4>Payment Section</h4>
          <p>
            The credit card provided will be used to charge you for the rental, damage deposit ($275.53), and
            any damage charges incurred. Please inspect the cart and report any existing damages before use.
            If a renter receives a parking ticket and does not pay it, a $250 fee will be charged in addition
            to the ticket amount by South Walton Carts LLC. A valid credit card must be on file to rent a cart
            and available at the time of rental. Failure to provide a valid card at the time of rental may delay
            or cancel the rental drop-off. By signing this contract, you authorize South Walton Carts LLC to charge
            the credit card used to book the rental through the rental software.

          </p>

          <h4>
            Cancellation Policy
          </h4>
          <p>
            Cancellations made at least 48 hours prior to the delivery date will not incur a cancellation fee, but a $100 paperwork fee will apply. Cancellations made less than 48 hours in advance will incur an additional $125 cancellation fee on top of the paperwork fee. South Walton Carts reserves the right to hold a $250 damage deposit on the provided credit card. A full refund of the deposit will be issued if the cart is returned undamaged, clean, and fully charged. Please allow 3-7 business days for the refund to be processed and returned to your account.
          </p>
          <p>
            For comments or concerns, please let us know how we are doing by emailing us at mailto:southwaltongolfcartrentals@gmail.com
            with "OWNER" in the subject line.
          </p>

          <p>
            If any damage occurs to the rented cart, other vehicles, or any third-party property, South Walton
            Carts LLC must be notified immediately, and a traffic report must be obtained. Any injury to the
            renter(s) or other parties must also be reported to South Walton Carts LLC as soon as possible.
          </p>
          <p>
            Most damage is caused by underage drivers or drivers under the influence. If you plan on allowing
            either of these, please be aware that we will charge your card for all associated damages, labor
            costs, and any missed rental payments.

          </p>
          <p>
            If underage drivers are observed operating the cart, it will result in immediate repossession of
            the cart, and no refunds will be issued.
          </p>

        </div>
        <div>

          <h4>
            Guidelines and Rules (PLEASE PRINT FOR YOUR RECORDS)
            PLEASE READ THIS CAREFULLY!!!
          </h4>
          <ul>
            <li>
              Obey all traffic laws while driving on the road. Please Google LSV laws in Florida or watch our safety video provided in your welcome email.
            </li>
            <li>
              Seatbelts must be worn at all times. Infants must be secured in a car seat, and young children must use a booster seat. We do not provide these. Absolutely no lap sitting or riding is allowed.

            </li>
            <li>
              The cart may only be driven on roads with speed limits of 35 mph or less. While most of CR-30A is 35 mph, HWY 98 and the roads leading north towards the highway are strictly off-limits.


            </li>
            <li>
              Store the cart in a safe area and always take the key with you.


            </li>
            <li>
              Keep the cart plugged in when not in use (electric carts only) and always return it fully charged and cleaned
            </li>
            <li>
              No off-road or reckless driving. Avoid unpaved or upgraded roads. Failure to do so will result in a cleaning fee.
            </li>
            <li>
              Do not drive on sidewalks, bike paths, or major highways.

            </li>
            <li>
              Do not drive under the influence of drugs or alcohol.
            </li>
            <li>

              Always park the cart in the appropriate parking space. If you receive a parking ticket, it must be paid before you leave town. Where acceptable, please park two carts in one parking space.

            </li>
            <li>
              Under no circumstances are underage drivers allowed to operate the cart. No exceptions.


            </li>
            <li>
              Do not store items on top of the cart. This will result in a $600 repaint fe
            </li>
            <li>
              Do not place feet or shoes on the dashboard. This will result in a $250 fee.
            </li>
            <li>
              Only store beach equipment with the rear seat flipped over. Placing equipment against painted areas will result in a repaint fee.

            </li>
            <li>
              Before using the cart, please inspect it and take photos of any existing damage. All previous damage must be reported to us before using the cart to avoid damage charges to your credit card. Photos can be sent to mailto:southwaltongolfcartrentals@gmail.com or 850-797-0284.

            </li>
            <li>
              Any damage caused by the renter must be reported with a traffic report as soon as possible.
            </li>
          </ul>
        </div>
        <div className='check'>
          <input type="checkbox"
            id="guidelineAgreement"
            checked={checkboxes.guidelineAgreement}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="guidelineAgreement">
            I HAVE READ AND AGREE TO ALL GUIDELINES PUT IN PLACE IN THE ABOVE STATEMENT
          </label>
        </div>
        <div>
          <h4>Fees/Fines</h4>
          <ul>
            <li>Walton County law enforcement will issue fines for all violations of automobile laws. This is not a
              golf cart; it is an LSV (Low-Speed Vehicle) automobile.</li>
            <li>Return cart uncharged: $125 fee.</li>
            <li>Damaged or curbed wheel: $150 per wheel.</li>
            <li>Lost key service call: $125, or $75 if you pick up a spare.</li>
            <li>Unpaid parking violations: $250 plus the ticket amount. Call 850-892-8115 to pay the ticket before leaving town.</li>
            <li>Labor on damaged carts: $135 per hour plus parts.</li>
            <li>Tow fee for running the cart out of charge: $150. If after hours, call El Sankary Tow Company and ensure they use a flatbed.</li>
            <li>Scratched roof: Minimum charge of $250, maximum charge of $750.</li>
            <li>Service call: $125.</li>
            <li>Extra dirty cart: $150 cleaning fee.</li>
            <li>Feet on dash: $250 fee.</li>
            <li>Tag holder replacement: $50.</li>
            <li>Repaint center pod due to beach equipment being stored against it: $350.</li>
            <li>Underage drivers will result in loss of rental and any money paid, along with a tow fee and labor fee to recover the cart.</li>
          </ul>
        </div>

        <div className='check'>
          <input
            type="checkbox"
            id="feesAgreement"
            checked={checkboxes.feesAgreement}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="feesAgreement">
            I have read and accepted all the fees above.
          </label>
        </div>

        <div>
          <p>
            Due to many carts being damaged from driving too fast on upgraded dirt roads, please avoid the following
            streets. If you are staying on one of these roads, please drive at less than 5 mph and avoid all potholes,
            mud puddles, and rough areas. The affected roads are
          </p>
          <ul>
            <li>Canal Street</li>
            <li>Dogwood Street</li>
            <li>Forest Street</li>
            <li>Thyme Street</li>
            <li>Hickory Street</li>
            <li>Live Oak Street</li>
            <li>Nightcap Street</li>
            <li>West Grove Street</li>
            <li>East Grove Street</li>
            <li>Holly Street</li>
            <li>Azalea Street</li>
            <li>Camelia Street</li>
            <li>Gardenia Street</li>
            <li>Birmingham Street</li>
          </ul>
          <p>
            We will still rent to houses located on these streets.
          </p>
          <p>
            By initializing this section, you acknowledge that if the renter does not avoid the roads listed above and returns a
            damaged or excessively dirty cart due to avoidable travel on these roads, extra fees will apply:
          </p>
          <ul>
            <li>Front end alignment fee: $95 per cart.</li>
            <li>Extra dirty cart wash fee: $150 per cart.</li>
          </ul>
          <p>
            If you are staying on one of these roads or driving on them, please wash your cart off and drive slowly.
          </p>
        </div>
        <div>
          <h4>
            CHECK IN (Please print for your trip)
          </h4>
          <p>
            Upon arrival, if the cart is at the property, first check it for any damage. Take pictures of all pre-existing damage found on the cart. Common areas to inspect include the top of the roof, curbed wheels, scratches in the paint, and cracked rear steps. Report all damage, even if it seems minor, via text message or email with photos attached. We examine the carts before delivery and prior to pickup. Please note that 99% of renters claim the cart wasn’t in their possession when it was damaged. Unfortunately, we cannot rely on the honor system anymore. If we find damage after your rental during our inspection, we will notify you with pictures and the amount required to fix it. Claiming that the cart was not damaged while in your possession will not be accepted, as it is your responsibility to report any previous damage. Any scratches that remove paint, curbed wheels, or other damage must be reported. By signing this, you acknowledge that you understand and agree to these terms.

            South Walton Carts does not refund for missed rental time due to issues with the property’s outlet. If the rental unit’s breaker trips, please try another outlet or contact the property manager for repairs. After you have sent in the damage photos, you will find the keys to the cart located inside the front driver’s side wheel. This is also where you will leave the keys upon departure.
          </p>

          <h4>
            CHARGING INSTRUCTIONS (GAS CARTS DO NOT APPLY)
          </h4>

          <p>Most of our calls after the renter has received the cart are related to charging and runtime issues. Here are some helpful tips:</p>

          <ul>
            <li>Electric carts are intended for short trips, not for all-day main transportation. When fully charged, you can expect to get 20-30 miles before it runs out of power. Most battery meters do not provide accurate readings. Always charge the cart whenever possible.</li>
            <li>The cart needs to be plugged in whenever it is not in use—no exceptions. Ensure the 110 outlet has power. Cart chargers pull a lot of amperage, so it’s common for a house breaker to trip. If this happens, try another outlet on a different circuit, ideally one on the opposite side of the house or an interior outlet.</li>
            <li>Most of our charging cords will light up to indicate that the 110 outlet has power. Once plugged in, locate the charger indicator light, usually on the dashboard, which should blink.</li>
            <li>We do not come out past 5 PM to pick up carts that are out of charge. You have two options: park it somewhere safe until the next day or call a flatbed tow truck to have it towed home. Never push, pull, or have it towed without a flatbed, as this may cause internal motor damage resulting in a $1,500 replacement cost.</li>
            <li>Please do not adjust the speaker bass and treble settings. Gas models will have enough fuel for the rental period.</li>
          </ul>

        </div>
        <div>
          <h3>Check Out Instructions:</h3>
          <ul>
            <li>Place the key inside the front driver’s side wheel.</li>
            <li>Leave the cart on charge.</li>
            <li>Wash off the cart if it is dirty and remove any trash from it.</li>
            <li>Check the cart for any damage that you or your party may have caused, comparing it with the photos taken during your check-in procedures.</li>
            <li>
              Please text <a href="tel:8507970284">850-797-0284</a> to let us know that you have completed these steps and inform us if you caused any damage. If we find damage that has not been reported, you will receive a damage report detailing the charges that will be applied to the card on file.
            </li>
            <li>You can either take your check-in photos or choose the option below for South Walton Carts to send a pre-delivery damage report.</li>
          </ul>
          <p>
            We understand this may seem like a lot of rules, but our goal is to ensure our customers’ safety and maintain the quality of our rental fleet. Have a safe trip home, and thank you again for your business!
          </p>

        </div>
        <div>
          <h3>Check-in Damage Report Options</h3>
          <p>
            This agreement states that the responsible party will select and abide by one of the terms for the delivery of the rental cart. The responsible party must choose <strong>YES</strong> for one option and <strong>NO</strong> for the other. The first option is free, while the sec

          </p>

        </div>
      </div>
      <div className="image-upload">
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="image-canvas"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="upload-container">
            <input
              type="file"
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>

          <div className="button-group">
            {isLoading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
            <button type="button" className="btn-clear" onClick={handleClear}
            >Clear</button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`submit-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAgreement;