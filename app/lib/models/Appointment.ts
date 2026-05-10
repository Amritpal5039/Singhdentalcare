import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, default: 'India', required: true },
  medicalHistory: { type: String, required: false },
  medication: { type: String, required: false },
  treatment: { type: String, required: true },
  otherTreatment: { type: String, required: false },
  isContacted: { type: Boolean, default: false },
}, { timestamps: true });

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
