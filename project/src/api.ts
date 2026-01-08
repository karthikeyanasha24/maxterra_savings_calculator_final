export const sendReportEmail = async (data: Record<string, any>) => {
  try {
    const response = await fetch('http://127.0.0.1:5001/api/send-report-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending report email:', error);
    throw error;
  }
};
