import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { hasEthereum } from '../utils/ethereum'
import Greeter from '../src/artifacts/contracts/Greeter.sol/Greeter.json'

// export default function Home () {
//   const [newGreetingMessage, setNewGreetingMessageState] = useState('')

//   return (
//     <div className='max-w-lg mt-36 mx-auto text-center px-4'>
//       <Head>
//         <title>Solidity Next.js Starter</title>
//         <meta
//           name='description'
//           content='Interact with a simple smart contract from the client-side.'
//         />
//         <link rel='icon' href='/favicon.ico' />
//       </Head>

//       <main className='space-y-8'>
//         {!process.env.NEXT_PUBLIC_GREETER_ADDRESS ? (
//           <p className='text-md'>
//             Please add a value to the <pre>NEXT_PUBLIC_GREETER_ADDRESS</pre>{' '}
//             environment variable.
//           </p>
//         ) : (
//           <>
//             <h1 className='text-4xl font-semibold mb-8'>
//               Solidity Next.js Starter
//             </h1>
//             <div className='space-y-8'>
//               <div className='flex flex-col space-y-4'>
//                 <input
//                   className='border p-4 w-100 text-center'
//                   placeholder='A fetched greeting will show here'
//                   value={greeting}
//                   disabled
//                 />
//                 <button
//                   className='bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full'
//                   onClick={fetchGreeting}
//                 >
//                   Fetch greeting from the blockchain
//                 </button>
//               </div>
//               <div className='space-y-8'>
//                 <div className='flex flex-col space-y-4'>
//                   <input
//                     className='border p-4 text-center'
//                     onChange={e => setNewGreetingState(e.target.value)}
//                     placeholder='Write a new greeting'
//                     ref={newGreetingInputRef}
//                   />
//                   <button
//                     className='bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md'
//                     onClick={setGreeting}
//                   >
//                     Set new greeting on the blockchain
//                   </button>
//                   <div className='h-2'>
//                     {newGreetingMessage && (
//                       <span className='text-sm text-gray-500 italic'>
//                         {newGreetingMessage}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className='h-4'>
//                 {connectedWalletAddress && (
//                   <p className='text-md'>{connectedWalletAddress}</p>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       <footer className='mt-20'>
//         <a
//           href='https://github.com/tomhirst/solidity-nextjs-starter/blob/main/README.md'
//           target='_blank'
//           rel='noopener noreferrer'
//           className='text-blue-600 hover:text-blue-700'
//         >
//           Read the docs
//         </a>
//       </footer>
//     </div>
//   )
// }

function App () {
  // React States
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState('')
  const [newTripName, setNewTripNameState] = useState('')
  const [tripName, setTripNameState] = useState('')
  const newTripNameRef = useRef()

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      alert('hasEthereum' + hasEthereum)
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }
    async function setConnectedWalletAddress () {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      try {
        const signerAddress = await signer.getAddress()
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
      } catch {
        setConnectedWalletAddressState('No wallet connected')
        return
      }
    }
    setConnectedWalletAddress()
  }, [])

  // Request access to MetaMask account
  async function requestAccount () {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  // User Login info
  const database = [
    {
      username: 'user',
      password: 'password'
    },
    {
      username: 'watcher',
      password: 'password'
    }
  ]

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password'
  }

  const handleSubmit = event => {
    //Prevent page reload
    event.preventDefault()

    var { uname, pass } = document.forms[0]

    // Find user login info
    const userData = database.find(user => user.username === uname.value)

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass })
      } else {
        setIsSubmitted(true)
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'uname', message: errors.uname })
    }
  }

  // Call smart contract, fetch current value
  async function fetchGreeting () {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_GREETER_ADDRESS,
      Greeter.abi,
      provider
    )
    try {
      const data = await contract.greet()
      setGreetingState(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Call smart contract, set new value
  async function handleSubmitTripDetailsForm () {
    alert('control here')
    if (!hasEthereum()) {
      alert('has ethereum block inside')
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }
    alert(newTripName)
    if (!newTripName) {
      alert('inside no new tripname')
      setNewTripNameState('Add a new Trip Name.')
      return
    }
    alert('outside no new tripname')

    await requestAccount()
    alert('below requestAccount')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {
      alert('nothing in provider')
    } else {
      alert(provider._getAddress)
    }
    alert(JSON.stringify(provider))
    alert(' provider >>> ' + provider)
    const signer = provider.getSigner()
    alert(' signer >>> ' + signer)
    const signerAddress = await signer.getAddress()
    alert('signerAddress >>> ' + signerAddress)
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_TRIP_DETAIL_ADDRESS,
      TripDetails.abi,
      signer
    )
    alert('New Tripname' + newTripName)
    alert('Calling Transactions' + newTripName)
    const transaction = await contract.setTripDetails(
      newTripName,
      'Home',
      'School',
      15
    )
    await transaction.wait()
    alert('After Calling Transaction.wait' + newTripName)
    setNewTripDetailsState(
      alert(
        'inside setNewTripDetailsState >>>'
      )`Trip Details updated to ${newTripName} from ${tripName}.`
    )
    newTripNameRef.current.value = ''
    setNewTripNameState('')
  }

  // Generate JSX code for error message
  const renderErrorMessage = name =>
    name === errorMessages.name && (
      <div className='error'>{errorMessages.message}</div>
    )

  // JSX code for login form
  const renderForm = (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username </label>
          <input type='text' name='uname' required />
          {renderErrorMessage('uname')}
        </div>
        <div className='input-container'>
          <label>Password </label>
          <input type='password' name='pass' required />
          {renderErrorMessage('pass')}
        </div>
        <div className='button-container'>
          <input type='submit' />
        </div>
      </form>
    </div>
  )

  const renderTripDetailsForm = (
    <div className='tripNameform'>
      <form onSubmit={handleSubmitTripDetailsForm}>
        <div className='input-container'>
          <label>Trip Name</label>
          <input
            className='input-container'
            onChange={e => setNewTripNameState(e.target.value)}
            placeholder='Enter a TripName'
            ref={newTripNameRef}
          />
        </div>
        <div className='input-container'>
          <label>Travelling From</label>
          <input type='text' name='travellingFrom' required />
        </div>
        <div className='input-container'>
          <label>Travelling To</label>
          <input type='text' name='travellingTo' required />
        </div>
        <div className='input-container'>
          <label>Time The Trip Would Take In Minutes</label>
          <input type='text' name='timeTripWouldTake' required />
        </div>
        <div className='button-container'>
          <input type='submit' />
        </div>
      </form>
    </div>
  )

  return (
    <div className='app'>
      <div className='login-form'>
        <div className='title'>Sign In To Women Safe Travel</div>
        {isSubmitted ? renderTripDetailsForm : renderForm}
      </div>
      <div className='h-4'>
        {connectedWalletAddress && (
          <p className='text-md'>{connectedWalletAddress}</p>
        )}
      </div>
    </div>
  )
}

export default App
