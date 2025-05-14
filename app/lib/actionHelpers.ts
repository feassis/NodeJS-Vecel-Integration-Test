function extractParticipants(formData: FormData): {
    name?: string; 
    plate_name?: string; 
    rg?: string;
}[] {
  const participants: {
    name?: string;
    plate_name?: string;
    rg?: string;
  }[] = [];

  let index = 0;
  while (true) {
    const name = formData.get(`participants[${index}][name]`)?.toString();
    const plate_name = formData.get(`participants[${index}][plate_name]`)?.toString();
    const rg = formData.get(`participants[${index}][rg]`)?.toString();

    // Se todos os campos estiverem vazios, encerra o loop
    if (!name && !plate_name && !rg) break;

    participants.push({ name, plate_name, rg });
    index++;
  }

  return participants;
}