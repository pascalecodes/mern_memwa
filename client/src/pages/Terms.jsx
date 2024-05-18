import React from 'react'

const styles = {
  list: {
    listStyleType: 'disc', // Adjust for different bullet styles (circle, square, etc.)
    padding: '0',
    margin: '0',

  },
  listItem: {
    marginBottom: '5px', // Adjust spacing as needed
    marginLeft: '30px',
  },
};

export default function Terms() {
  return (
    <div className='py-20 px-8 max-w-6xl mx-auto min-h-[20vh]'>
      <h1 className='text-5xl font-bold mb-4 text-blue-600 text-center' >Memwa Terms of Service</h1>
      <div className="container px-4 py-5 my-5">
        <h2 className='text-2xl text-blue-700 mt-4'>Welcome to Memwa Terms of Service Page!</h2>
        <p>These Terms of Service (the "Terms") govern your access to and use of the Memwa website and mobile application (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>
        <p>If you do not agree to these Terms, you may not access or use the Service.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>Definitions</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>"Memwa" means the Memwa website and mobile application.</li>
          <li style={styles.listItem}>"User" means any individual who accesses or uses the Service.</li>
        </ul>
        <h2 className='text-2xl text-blue-700 mt-4'>Grant of License</h2>
        <p>Memwa grants you a limited, non-exclusive, non-transferable license to access and use the Service for your personal, non-commercial use.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>Your Responsibilities</h2>
        <p>You are responsible for all of your activity on the Service. You agree to use the Service in a manner that complies with all applicable laws and regulations.</p>
        <p>You are responsible for keeping your account information secure. You agree not to share your account information with anyone else.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>Memwa's Rights</h2>
        <p>Memwa reserves the right to modify or terminate the Service at any time.</p>
        <p>Memwa reserves the right to refuse service to anyone for any reason.</p>
        <h2 className='text-2xl text-blue-700 mt-4' >Indemnification</h2>
        <p>You agree to indemnify and hold Memwa harmless from any and all claims, losses, damages, liabilities, costs, and expenses (including attorneys' fees) arising out of or in connection with your use of the Service.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>Dispute Resolution</h2>
        <p>Any dispute arising out of or in connection with these Terms will be resolved by binding arbitration in accordance with the JAMS Streamlined Arbitration Rules and Procedures. The arbitration will be held in Los Angeles, California, and the arbitrator's decision will be final and binding.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>Miscellaneous</h2>
        <p>These Terms constitute the entire agreement between you and Memwa regarding the Service. These Terms supersede any prior or contemporaneous communications, representations, or agreements, whether oral or written.</p>
        <p>If any provision of these Terms is held to be invalid or unenforceable, such provision will be struck from these Terms and the remaining provisions will remain in full force and effect.</p>
        <p>These Terms are governed by the laws of the State of California without regard to its conflict of laws provisions.</p>
        <p>You agree that any dispute arising out of or in connection with these Terms will be resolved exclusively in the federal or state courts located in San Francisco, California.</p>

      </div>
    </div>
  )
}
