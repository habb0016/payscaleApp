// Define job options and their corresponding yearly salaries
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

// React component for the form
function CalculatorForm() {
  const [meetingTitle, setMeetingTitle] = React.useState('Meeting Title');
  const [participants, setParticipants] = React.useState([{ title: '', count: 0 }]);
  const [meetingDuration, setMeetingDuration] = React.useState(0);
  const [yearlyCost, setYearlyCost] = React.useState(0);
  const [biweeklyCost, setBiweeklyCost] = React.useState(0);
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);

  // Function to handle changes in meeting title
  const handleMeetingTitleChange = (event) => {
    setMeetingTitle(event.target.value);
  };

  // Function to handle participant title change
  const handleParticipantTitleChange = (event, index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].title = event.target.value;
    setParticipants(updatedParticipants);
  };

  // Function to handle participant count change
  const handleParticipantCountChange = (event, index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].count = parseInt(event.target.value);
    setParticipants(updatedParticipants);
  };

  // Function to add a new participant
  const addParticipant = () => {
    if (participants.length < 10) {
      setParticipants([...participants, { title: '', count: 0 }]);
    }
  };

  // Function to handle changes in meeting duration
  const handleMeetingDurationChange = (event) => {
    setMeetingDuration(parseFloat(event.target.value));
  };

  // Function to calculate the total cost
  const calculateCost = () => {
    let totalCost = 0;
    participants.forEach((participant) => {
      const jobOption = jobOptions.find((option) => option.job === participant.title);
      if (jobOption) {
        const hourlyRate = jobOption.rate / (52 * 40); // Divide yearly rate by number of working weeks (52) and hours per week (40)
        const meetingCost = hourlyRate * meetingDuration; // Multiply hourly rate by meeting duration in hours
        totalCost += meetingCost * participant.count;
      }
    });

    const yearlyMeetingCost = totalCost * 52; // Assuming 52 weeks in a year

    setYearlyCost(yearlyMeetingCost.toFixed(2));
    setBiweeklyCost((yearlyMeetingCost / 26).toFixed(2));
  };

  // Function to handle editing the meeting title
  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  // Function to handle saving the meeting title
  const handleSaveTitle = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="container-fluid bg-white w-75 p-4 shadow my-4 text-center">
      <i className="fa-solid fa-business-time"></i>
      <div>
        <h2>
          {isEditingTitle ? (
            <>
              <input
                type="text"
                value={meetingTitle}
                onChange={handleMeetingTitleChange}
              />
              <button onClick={handleSaveTitle}>Save</button>
            </>
          ) : (
            <>
              {meetingTitle}
              <i
                className="fa-solid fa-pencil"
                onClick={handleEditTitle}
                style={{ cursor: 'pointer' }}
              ></i>
            </>
          )}
        </h2>
      </div>
      <div>
        <h3>Participants:</h3>
        {participants.map((participant, index) => (
          <div key={index}>
            <label htmlFor={`participantTitle${index}`}>Title:</label>
            <select
              id={`participantTitle${index}`}
              value={participant.title}
              onChange={(event) => handleParticipantTitleChange(event, index)}
            >
              <option value="">Select...</option>
              {jobOptions.map((option, index) => (
                <option key={index} value={option.job}>
                  {option.job}
                </option>
              ))}
            </select>
            <label htmlFor={`participantCount${index}`}>Number:</label>
            <input
              type="number"
              id={`participantCount${index}`}
              value={participant.count}
              onChange={(event) => handleParticipantCountChange(event, index)}
            />
          </div>
        ))}
        {participants.length < 10 && (
          <button onClick={addParticipant}>+ Add Participant</button>
        )}
      </div>
      <div>
        <h3>Meeting Duration</h3>
        <select
          value={meetingDuration}
          onChange={handleMeetingDurationChange}
        >
          <option value="0.00">Select...</option>
          <option value="0.25">15 Minutes</option>
          <option value="0.50">30 Minutes</option>
          <option value="0.75">45 Minutes</option>
          <option value="1.00">1 Hour</option>
          <option value="1.50">1 Hour 30 Minutes</option>
          <option value="2.00">2 Hours</option>
          <option value="2.50">2 Hours 30 Minutes</option>
          <option value="3.00">3 Hours</option>
          <option value="3.50">3 Hours 30 Minutes</option>
          <option value="4.00">4 Hours</option>
          <option value="4.50">4 Hours 30 Minutes</option>
          <option value="5.00">5 Hours</option>
          <option value="5.50">5 Hours 30 Minutes</option>
          <option value="6.00">6 Hours</option>
          <option value="6.50">6 Hours 30 Minutes</option>
          <option value="7.00">7 Hours</option>
          <option value="7.50">7 Hours 30 Minutes</option>
          <option value="8.00">8 Hours</option>
        </select>
      </div>
      <div>
        <h3>Cost</h3>
        <p>${(yearlyCost/52).toFixed(2)} / meeting</p>
        <p>${yearlyCost} / year</p>
        <p>${(yearlyCost/2).toFixed(2)} / bi-weekly</p>
      </div>
      <button onClick={calculateCost}>Calculate</button>
    </div>
  );
}

// Render the form component
ReactDOM.render(<CalculatorForm />, document.getElementById('root'));
