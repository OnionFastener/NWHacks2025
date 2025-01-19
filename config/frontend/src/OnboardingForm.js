import React, { useState } from 'react';
import './styles/OnboardingForm.css';

const OnboardingForm = ({ onComplete }) => {
<<<<<<< HEAD
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        height: '',
        weight: '',
        allergies: '',
        medicalConditions: '',
        currentMedications: '',
        smokingStatus: '',
        alcoholConsumption: '',
        primaryConcerns: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userMedicalData', JSON.stringify(formData));
        onComplete();
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className="form-step">
                        <h2>Basic Information</h2>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <button onClick={nextStep}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <h2>Physical Information</h2>
                        <input
                            type="number"
                            name="height"
                            placeholder="Height (cm)"
                            value={formData.height}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (kg)"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                        <button onClick={prevStep}>Back</button>
                        <button onClick={nextStep}>Next</button>
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <h2>Medical Information</h2>
                        <textarea
                            name="allergies"
                            placeholder="Known Allergies (if any)"
                            value={formData.allergies}
                            onChange={handleChange}
                        />
                        <textarea
                            name="medicalConditions"
                            placeholder="Current Medical Conditions (if any)"
                            value={formData.medicalConditions}
                            onChange={handleChange}
                        />
                        <textarea
                            name="currentMedications"
                            placeholder="Current Medications (if any)"
                            value={formData.currentMedications}
                            onChange={handleChange}
                        />
                        <button onClick={prevStep}>Back</button>
                        <button onClick={handleSubmit}>Complete</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-form">
                <h1>Welcome to MediCompanion</h1>
                <p>Let's get to know you better to provide personalized medical assistance</p>
                {renderStep()}
            </div>
        </div>
    );
=======
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    emergencyContact: '',
    allergies: '',
    medicalConditions: '',
    currentMedications: '',
    smokingStatus: '',
    alcoholConsumption: '',
    primaryConcerns: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userMedicalData', JSON.stringify(formData));
    onComplete();
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Basic Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Physical Information</h2>
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Medical Information</h2>
            <textarea
              name="allergies"
              placeholder="Known Allergies (if any)"
              value={formData.allergies}
              onChange={handleChange}
            />
            <textarea
              name="medicalConditions"
              placeholder="Current Medical Conditions (if any)"
              value={formData.medicalConditions}
              onChange={handleChange}
            />
            <textarea
              name="currentMedications"
              placeholder="Current Medications (if any)"
              value={formData.currentMedications}
              onChange={handleChange}
            />
            <button onClick={prevStep}>Back</button>
            <button onClick={handleSubmit}>Complete</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-form">
        <h1>Welcome to MediCompanion</h1>
        <p>Let's get to know you better to provide personalized medical assistance</p>
        {renderStep()}
      </div>
    </div>
  );
>>>>>>> amon_final2
};

export default OnboardingForm; 