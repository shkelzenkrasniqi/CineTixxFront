import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScreeningById, bookScreening } from '../services/bookingService';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from './Footer';
import Header from './Header';
import Modal from '../Modal';  

const Booking = () => {
    const { screeningId } = useParams();
    const navigate = useNavigate();
    const [screening, setScreening] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(3);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchScreening = async () => {
            try {
                const data = await getScreeningById(screeningId);
                setScreening(data);
            } catch (error) {
                console.error('Failed to fetch screening', error);
            }
        };

        fetchScreening();
    }, [screeningId, navigate]);

    const handleBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.nameid;

        try {
            await bookScreening(screeningId, numberOfTickets, userId);
            return true;
        } catch (error) {
            console.error('Failed to book tickets', error);
            setShowModal(true);
            return false;
        }
    };

    const generateInvoice = async () => {
        const doc = new jsPDF();
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        const invoiceHTML = `
            <div style="font-family: 'Helvetica', 'Arial', sans-serif; padding: 20px; width: ${pdfWidth}px; border: 2px dashed #333; border-radius: 10px; position: relative;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #d9534f; margin: 0;">CINETIXX</h1>
                    <h2 style="color: #333; margin: 0;">Movie Ticket</h2>
                </div>
                <hr style="border: 1px dashed #333; margin: 10px 0;" />
                <div style="margin-bottom: 10px;">
                    <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
                    <p style="margin: 5px 0;"><strong>Movie:</strong> ${screening.movieTitle}</p>
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(screening.startTime).toLocaleString()}</p>
                    <p style="margin: 5px 0;"><strong>Number of Tickets:</strong> ${numberOfTickets}</p>
                    <p style="margin: 5px 0;"><strong>Total Price:</strong> $${(screening.price * numberOfTickets).toFixed(2)}</p>
                </div>
                <hr style="border: 1px dashed #333; margin: 10px 0;" />
                <p style="text-align: center; color: #555;">Thank you for your purchase!</p>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = invoiceHTML;
        document.body.appendChild(container);

        const canvas = await html2canvas(container);
        const imgData = canvas.toDataURL('image/png');

        document.body.removeChild(container);

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save(`Invoice_${orderId}.pdf`);
    };

    if (!screening) return <div>Loading...</div>;

    const totalPrice = (screening.price * numberOfTickets).toFixed(2);

    return (
        <div>
            <Header/>
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center p-8">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-xl w-full">
                    <h1 className="text-4xl font-bold text-center mb-8">Booking</h1>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">Movie: {screening.movie.movieName}</h2>
                        <h2 className="text-2xl font-semibold mb-2">Room: {screening.cinemaRoom.name}</h2>
                        <h2 className="text-2xl font-semibold mb-2">{new Date(screening.startTime).toLocaleString()}</h2>
                        <p className="text-gray-400 mb-4">{new Date(screening.endTime).toLocaleString()}</p>
                        <span className="text-lg font-bold">{screening.price}$ per ticket</span>
                        <div className="mt-4">
                            <label className="block mb-2 text-lg">Number of Tickets</label>
                            <input
                                type="number"
                                value={numberOfTickets}
                                onChange={(e) => setNumberOfTickets(Number(e.target.value))}
                                className="w-full p-2 rounded-md bg-gray-700 text-white"
                                min="1"
                            />
                        </div>
                        <div className="mt-4">
                            <span className="text-lg font-bold">Total: {totalPrice}$</span>
                        </div>
                        {!bookingSuccess ? (
                            <PayPalScriptProvider options={{ clientId: "AUIxojMpXDAPU_QVAhr4IBXtFt7goHJinozSklnokGX_LNsU03dJMlloW0fqafKxjJ3oVdWQE0TRfQHe" }}>
                                <PayPalButtons
                                    style={{ layout: 'horizontal' }}
                                    createOrder={async (data, actions) => {
                                        const bookingResult = await handleBooking();
                                        if (bookingResult) {
                                            return actions.order.create({
                                                intent: 'CAPTURE',
                                                purchase_units: [{
                                                    amount: {
                                                        currency_code: 'USD',
                                                        value: totalPrice,
                                                    }
                                                }]
                                            });
                                        } else {
                                            return Promise.reject(new Error('Booking failed'));
                                        }
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then(function (details) {
                                            setOrderId(details.id);
                                            setBookingSuccess(true);
                                        });
                                    }}
                                    onError={(err) => {
                                        console.error('PayPal Checkout onError:', err);
                                        setShowModal(true);
                                    }}
                                />
                            </PayPalScriptProvider>
                        ) : (
                            <div className="mt-4 text-center">
                                <p className="text-lg font-bold text-green-500">Booking was successful!</p>
                                <button
                                    onClick={generateInvoice}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Download Invoice
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
            <Modal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                title="Booking Error">
                <p>No available seats for the number of tickets you purchased.</p>
            </Modal>
        </div>
    );
};

export default Booking;
