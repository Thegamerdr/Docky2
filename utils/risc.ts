export async function configureEventStream() {
  try {
    console.log('Sending request to configure event stream...');
    const response = await fetch('/api/risc/configure', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Failed to configure event stream:', data);
      throw new Error(data.error || 'Failed to configure event stream');
    }
    console.log('Event stream configured successfully:', data);
    return data;
  } catch (error) {
    console.error('Error configuring event stream:', error);
    throw error;
  }
}

export async function testEventStream() {
  try {
    console.log('Sending request to test event stream...');
    const response = await fetch('/api/risc/test', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Failed to test event stream:', data);
      throw new Error(data.error || 'Failed to test event stream');
    }
    console.log('Event stream test successful:', data);
    return data;
  } catch (error) {
    console.error('Error testing event stream:', error);
    throw error;
  }
}

