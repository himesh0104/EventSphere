import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: Date, required: true },
    locationName: { type: String, default: '' },
    maxParticipants: { type: Number, default: 50 },
    currentParticipants: { type: Number, default: 0 },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// geospatial index
eventSchema.index({ location: '2dsphere' });

// Normalize JSON output
eventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id?.toString();
    if (ret.location && Array.isArray(ret.location.coordinates)) {
      const [lng, lat] = ret.location.coordinates;
      ret.location = { lat, lng };
    }
    delete ret._id;
  },
});

export const Event = mongoose.model('Event', eventSchema);
