// Import React components
const { useState, Fragment } = React;

// Define job options and their corresponding hourly rates
const jobOptions = [
  { job: 'Assistant Brand Manager', rate: 50000 },
  { job: 'Brand Manager', rate: 70000 },
  { job: 'Senior Brand Manager', rate: 90000 },
  { job: 'Director', rate: 120000 },
  { job: 'Vice President', rate: 150000 },
  { job: 'Senior Vice President', rate: 180000 },
  { job: 'President', rate: 220000 },
  { job: 'Account Manager', rate: 60000 },
  { job: 'Account Director', rate: 80000 },
  { job: 'Account VP', rate: 100000 },
  { job: 'Producer', rate: 55000 },
  { job: 'Creative', rate: 65000 },
];

// Calculator component
function Calculator() {
  const [selectedJob, setSelectedJob] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [cost, setCost] = useState(0);

  // Handle job selection
  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  // Handle minutes input
  const handleMinutesChange = (event) => {
    setMinutes(Number(event.target.value));
  };

  // Calculate meeting cost
  const calculateCost = () => {
    const selectedOption = jobOptions.find((option) => option.job === selectedJob);
    if (selectedOption) {
      const hourlyRate = selectedOption.rate;
      const meetingCost = (minutes / 60) * hourlyRate;
      setCost(meetingCost.toFixed(2));
    } else {
      setCost(0);
    }
  };

  return (
    <Fragment>
      <h2>Meeting Details</h2>
      <div>
        <label htmlFor="job-select">Select a job:</label>
        <select id="job-select" value={selectedJob} onChange={handleJobChange}>
          <option value="">-- Select a job --</option>
          {jobOptions.map((option) => (
            <option key={option.job} value={option.job}>
              {option.job}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="minutes-input">Enter the number of minutes:</label>
        <input
          id="minutes-input"
          type="number"
          min="0"
          value={minutes}
          onChange={handleMinutesChange}
        />
      </div>
      <div>
        <button onClick={calculateCost}>Calculate</button>
      </div>
      <div>
        {cost > 0 && (
          <p>
            The meeting will cost <strong>${cost}</strong>.
          </p>
        )}
      </div>
    </Fragment>
  );
}

// Create a root and render the form
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Calculator />);
