import { Link } from 'react-router-dom';

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

export default function Privacy() {
  return (
    <div className='py-20 px-8 max-w-6xl mx-auto min-h-[20vh]'>
      <h1 className='text-5xl font-bold mb-4 text-blue-600 text-center' >Memwa Privacy Policy</h1>
      <div className="container px-4 py-5 my-5">
        <h2 className='text-3xl text-blue-700'>Welcome to Memwa Privacy Policy Page!</h2>
        <p>This Privacy Policy (the "Policy") describes how Memwa collects, uses, and discloses your personal information when you use the Memwa website and mobile application (the "Service").</p>
        <p>If you do not agree to this Policy, you may not access or use the Service.</p>

      <h2 className='text-2xl text-blue-700 mt-2'>We take your privacy seriously</h2>
      <p>At Memwa, we understand that your privacy is important to you. That's why we've built our app with privacy in mind.</p>
      <p>We collect only the data that we need to provide you with the best possible experience. We never sell or share your data with third parties.</p>
      <p>You can learn more about our data privacy practices by reading our privacy policy below</p>
      <h2 className='text-2xl text-blue-700 mt-2'>What data do we collect?</h2>
      <p>We collect the following data about you:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Your email address</li>
        <li style={styles.listItem}>Your name</li>
        <li style={styles.listItem}>Your date of birth</li>
        <li style={styles.listItem}>Your language preferences</li>
        <li style={styles.listItem}>Your device information</li>
        <li style={styles.listItem}>Your usage data</li>
      </ul>
      <p>We use this data to provide you with the best possible experience on Memwa. For example, we use your email address to send you notifications about your account and your progress. We use your name to personalize your experience on Memwa. We use your date of birth to provide you with age-appropriate content. We use your language preferences to display the app in your preferred language. We use your device information to troubleshoot problems with the app. We use your usage data to improve the app and to make recommendations to you.</p>
      <h2 className='text-2xl text-blue-700 mt-2'>How do we protect your data?</h2>
      <p>We take your privacy seriously. We use a variety of security measures to protect your data, including:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Encryption</li>
        <li style={styles.listItem}>Firewalls</li>
        <li style={styles.listItem}>Intrusion detection systems</li>
        <li style={styles.listItem}>Physical security</li>
      </ul>
      <p>We also have a team of security experts who are constantly working to keep your data safe.</p>
      <h2 className='text-2xl text-blue-700 mt-2'>What are your Data rights?</h2>
      <p>You have the following rights with respect to your data:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>The right to access your data</li>
        <li style={styles.listItem}>The right to correct your data</li>
        <li style={styles.listItem}>The right to delete your data</li>
        <li style={styles.listItem}>The right to object to the processing of your data</li>
      </ul>
      <p>You can exercise your rights by contacting us at <span> </span>
       <Link 
              to={`mailto:info@memwa.app?subject=Question on Policies Memwa app`}
              className='text-blue-500 hover:opacity-95'>
                info@memwa.app
        </Link> 
      </p>

        <h2 className='text-2xl text-blue-700 mt-2'>What Personal Information Do We Collect?</h2>
        <p>We collect the following personal information about you:</p>
        <ul style={styles.list}>
            <li style={styles.listItem}>Your name</li>
            <li style={styles.listItem}>Your email address</li>
            <li style={styles.listItem}>Your date of birth</li>
            <li style={styles.listItem}>Your language preferences</li>
            <li style={styles.listItem}>Your device information</li>
            <li style={styles.listItem}>Your usage data</li>
        </ul>
        <p>We also collect information about your interactions with the Service, such as the pages you visit, the links you click, and the search terms you use.</p>
        <h2 className='text-2xl text-blue-700 mt-2'>How Do We Use Your Personal Information?</h2>
        <p>We use your personal information to provide you with the Service, to improve the Service, and to send you marketing communications.</p>
        <p>We may also use your personal information to contact you about your account, to troubleshoot problems with the Service, and to comply with our legal obligations.</p>
        <h2 className='text-2xl text-blue-700 mt-2'>How Do We Protect Your Personal Information?</h2>
        <p>We take your privacy seriously. We use a variety of security measures to protect your personal information, including:</p>
        <ul style={styles.list}>
            <li style={styles.listItem}>Encryption</li>
            <li style={styles.listItem}>Firewalls</li>
            <li style={styles.listItem}>Intrusion detection systems</li>
            <li style={styles.listItem}>Physical security</li>
        </ul>
        <p>We also have a team of security experts who are constantly working to keep your data safe.</p>
        <h2 className='text-2xl text-blue-700 mt-2'>What Are Your Personal Information Rights?</h2>
        <p>You have the following rights with respect to your personal information:</p>
        <ul style={styles.list}>
            <li style={styles.listItem}>The right to access your personal information</li>
            <li style={styles.listItem}>The right to correct your personal information</li>
            <li style={styles.listItem}>The right to delete your personal information</li>
            <li style={styles.listItem}>The right to object to the processing of your personal information</li>
        </ul>
        <p>You can exercise your rights by contacting us at <span> </span>
        <Link 
              to={`mailto:info@memwa.app?subject=Question on Policies Memwa app`}
              className='text-blue-500 hover:opacity-95'>
                info@memwa.app
        </Link></p>
        <h2 className='text-2xl text-blue-700 mt-2'>How Do We Handle Children's Privacy?</h2>
        <p>Memwa is not directed to and should not be used by children under the age of 16.</p>
        <p>If we learn that we have collected personal information from a child under the age of 16, we will delete that information as quickly as possible.</p>
        <h2 className='text-2xl text-blue-700 mt-2'>How Do We Use Cookies?</h2>
        <p>We use cookies to collect and store information about your visits to the Service. Cookies are small text files that are placed on your computer when you visit a website.</p>
        <p>We use cookies to improve your experience on the Service, to track your interactions with the Service, and to target our marketing communications.</p>

        <h2 className='text-2xl text-blue-700 mt-2'>How Can You Contact Us?</h2>
        <p className='mb-4 text-slate-700'>If you have any questions about this Policy, please contact us at<span> </span>  
        <Link 
              to={`mailto:info@memwa.app?subject=Question on Privacy Memwa app`}
              className='text-blue-500 hover:opacity-95'>
                info@memwa.app
        </Link> 
        </p>
    </div>
    </div>
  )
}
