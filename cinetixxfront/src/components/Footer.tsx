import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-white bg-slate-900">
      <section className="flex justify-between p-4 bg-purple-700">
        <div className="mr-5">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="#" className="text-white mr-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white mr-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white mr-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="text-white mr-4">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white mr-4">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-white mr-4">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="mt-5">
        <div className="container mx-auto text-center md:text-left">
          <div className="flex flex-wrap mt-3">
            <div className="w-full md:w-1/4 lg:w-1/3 mx-auto mb-4">
              <h6 className="uppercase font-bold">CINETIXX</h6>
              <hr className="mb-4 mt-0 ml-0 mx-auto w-16 bg-purple-500 h-1"/>
              <p>
              Welcome to Cinetixx! Dive into the world of cinema with us, where we bring you the latest movies, timeless classics, and everything in between. Whether you're a fan of heart-pounding action, heartwarming dramas, or side-splitting comedies, Cinetixx is your ultimate destination for all things film. 
              </p>
            </div>

            <div className="w-full md:w-1/4 lg:w-1/6 mx-auto mb-4">
              <h6 className="uppercase font-bold">Products</h6>
              <hr className="mb-4 mt-0 ml-0 mx-auto w-16 bg-purple-500 h-1" />
              <p>
                <a href="#!" className="text-white">Movie Tickets</a>
              </p>
              <p>
                <a href="#!" className="text-white">Gift Cards</a>
              </p>
              <p>
                <a href="#!" className="text-white">Streaming Services</a>
              </p>
              <p>
                <a href="#!" className="text-white">Event Packages</a>
              </p>
            </div>

            <div className="w-full md:w-1/4 lg:w-1/6 mx-auto mb-4">
              <h6 className="uppercase font-bold">Useful links</h6>
              <hr className="mb-4 ml-0 mt-0 mx-auto w-16 bg-purple-500 h-1" />
              <p>
                <a href="#!" className="text-white">Home</a>
              </p>
              <p>
                <a href="#!" className="text-white">About</a>
              </p>
              <p>
                <a href="#!" className="text-white">Services</a>
              </p>
              <p>
                <a href="#!" className="text-white">Help</a>
              </p>
            </div>

            <div className="w-full md:w-1/4 lg:w-1/4 mx-auto mb-4">
              <h6 className="uppercase font-bold">Contact</h6>
              <hr className="mb-4 mt-0 ml-0 mx-auto w-16 bg-purple-500 h-1" />
              <p><i className="fas fa-home mr-2"></i> Kosovo, PY 10012, RKS</p>
              <p><i className="fas fa-envelope mr-2"></i> Cinetixx@example.com</p>
              <p><i className="fas fa-phone mr-2"></i> + 01 234x 567x 88</p>
              <p><i className="fas fa-print mr-2"></i> + 01 234x 567x 89</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-3 bg-gray bg-opacity-20">
        © 2024 Copyright:
        <a className="text-white" href=""> All Rights Reserved</a>
      </div>
    </footer>
  );
};

export default Footer;
