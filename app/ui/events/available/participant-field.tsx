'use client';

import { useState } from 'react';

export default function ParticipantsField() {
  const [participants, setParticipants] = useState([{ name: '', plate_name: '', rg: '' }]);

  const addParticipant = () => {
    setParticipants([...participants, { name: '', plate_name: '', rg: '' }]);
  };

  const removeParticipant = (index: number) => {
    const updated = [...participants];
    updated.splice(index, 1);
    setParticipants(updated);
  };

  type Participant = {
  name: string;
  plate_name: string;
  rg: string;
};

const handleChange = (
  index: number,
  field: keyof Participant,
  value: string
) => {
  const updated = [...participants];
  updated[index][field] = value;
  setParticipants(updated);
};

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Participants</label>
      {participants.map((participant, index) => (
  <div key={index} className="mb-3 flex space-x-4 items-center">
    <input
      type="text"
      name={`participants[${index}][name]`}
      placeholder="Name"
      className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
      value={participant.name}
      onChange={(e) => handleChange(index, 'name', e.target.value)}
    />
    <input
      type="text"
      name={`participants[${index}][plate_name]`}
      placeholder="Plate Name"
      className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
      value={participant.plate_name}
      onChange={(e) => handleChange(index, 'plate_name', e.target.value)}
    />
    <input
      type="text"
      name={`participants[${index}][rg]`}
      placeholder="RG"
      className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
      value={participant.rg}
      onChange={(e) => handleChange(index, 'rg', e.target.value)}
    />
    <button
      type="button"
      className="text-red-600 text-sm"
      onClick={() => removeParticipant(index)}
    >
      Remove
    </button>
  </div>
))}
      <button
        type="button"
        onClick={addParticipant}
        className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md"
      >
        Adicionar Participante
      </button>
    </div>
  );
}
