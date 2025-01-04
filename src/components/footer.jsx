import React from 'react'

const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <footer className="bg-black py-16 text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info */}
          <div>
            <h4 className="text-2xl font-semibold mb-4 text-red-600">Contact Info</h4>
            <p className="mb-4">Morbi leo risus, porta ac vestibulum at ero nulla non metus auctor fringilla.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500">Facebook</a>
              <a href="#" className="hover:text-red-500">Twitter</a>
              <a href="#" className="hover:text-red-500">LinkedIn</a>
              <a href="#" className="hover:text-red-500">Instagram</a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-2xl font-semibold mb-4 text-red-600">Useful Info</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-500">Support Center</a></li>
              <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-2xl font-semibold mb-4 text-red-600">Subscribe to Our Newsletter</h4>
            <p className="mb-4">Sign up for our newsletter to get the latest updates. We won’t spam you!</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="px-4 py-2 text-black rounded-l-lg w-full" />
              <button className="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-500 transition-colors">Subscribe</button>
            </div>
          </div>

          {/* Additional Footer Content */}
          <div>
            <img src="https://via.placeholder.com/150" alt="Logo" className="w-24 mb-4" />
            <p className="text-sm">© 2024 eSOFTWAVE, All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
