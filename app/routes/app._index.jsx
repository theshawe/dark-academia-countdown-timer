import { useState, useEffect } from "react";
import styles from './_index/styles.module.css';
import { Page, Layout, Card, TextField, DatePicker, Text, InlineStack, Button, Select } from "@shopify/polaris";
import { RgbaColorPicker } from "react-colorful";

// Countdown Timer Component with Animations and Customizations
function Countdown({ eventDate, fontColor, backgroundColor, theme, fontFamily, message, ctaText }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [urgencyLevel, setUrgencyLevel] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());

      // Dynamic urgency settings
      if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes <= 5) {
        setUrgencyLevel('critical');
      } else if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes <= 30) {
        setUrgencyLevel('warning');
      } else {
        setUrgencyLevel('normal');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate, timeLeft]);

  return (
    <Card title={message} sectioned>
      <div className={`${styles.countdown} ${styles[theme]} ${styles[urgencyLevel]}`} style={{ color: fontColor, backgroundColor, fontFamily }}>
        {timeLeft.days !== undefined ? (
          <Text as="p" variant="headingLg" className={styles.countdownText}>
            {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes {timeLeft.seconds} Seconds
          </Text>
        ) : (
          <Text as="p" variant="headingLg" className={styles.countdownText}>Time's up!</Text>
        )}
      </div>
      {/* Dynamic Call to Action */}
      <div className={styles.ctaContainer}>
        <Button className={`${styles.ctaButton} ${styles[urgencyLevel]}`} onClick={() => alert('CTA clicked')}>
          {ctaText}
        </Button>
      </div>
    </Card>
  );
}

// Admin Panel Component (Main App for Customization)
export default function Index() {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-12-25"));
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());
  const [fontColor, setFontColor] = useState("rgba(0, 0, 0, 1)");
  const [backgroundColor, setBackgroundColor] = useState("rgba(255, 255, 255, 1)");
  const [theme, setTheme] = useState('default');
  const [fontFamily, setFontFamily] = useState('Garamond');
  const [message, setMessage] = useState("Countdown to Your Event");
  const [ctaText, setCtaText] = useState("Shop Now");

  // Font picker options
  const fontOptions = [
    { label: 'Garamond', value: 'Garamond' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Georgia', value: 'Georgia' }
  ];

  const handleDateChange = (newDate) => setSelectedDate(newDate.start);
  const handleMonthChange = (month, year) => {
    setMonth(month);
    setYear(year);
  };

  const setHolidayCountdown = (holidayDate, holidayTheme, font, background, message, cta) => {
    setSelectedDate(holidayDate);
    setMonth(holidayDate.getMonth());
    setYear(holidayDate.getFullYear());
    setTheme(holidayTheme);
    setFontColor(font);
    setBackgroundColor(background);
    setMessage(message);
    setCtaText(cta);
  };

  return (
    <Page title="Dark Academia Countdown Timer">
      <Layout>
        <Layout.Section>
          <Countdown
            eventDate={selectedDate}
            fontColor={fontColor}
            backgroundColor={backgroundColor}
            theme={theme}
            fontFamily={fontFamily}
            message={message}
            ctaText={ctaText}
          />

          {/* Font Picker */}
          <Card sectioned>
            <Select
              label="Font Family"
              options={fontOptions}
              onChange={setFontFamily}
              value={fontFamily}
            />
          </Card>

          {/* Holiday Countdown Shortcut Buttons */}
          <Card sectioned>
            <InlineStack spacing="loose">
              <Button
                onClick={() =>
                  setHolidayCountdown(new Date("2024-10-31"), 'spooky', 'rgba(255, 117, 24, 1)', 'rgba(26, 26, 26, 1)', 'Halloween Flash Sale Ends In:', 'Grab Your Deal')
                }
              >
                Halloween
              </Button>
              <Button
                onClick={() =>
                  setHolidayCountdown(new Date("2024-12-25"), 'christmas', 'rgba(255, 255, 255, 1)', 'rgba(211, 47, 47, 1)', 'Christmas Sale Ends In:', 'Shop Christmas Deals')
                }
              >
                Christmas
              </Button>
              <Button
                onClick={() =>
                  setHolidayCountdown(new Date("2024-12-31"), 'newyear', 'rgba(255, 234, 0, 1)', 'rgba(18, 18, 18, 1)', 'New Year\'s Eve Deals:', 'Start the New Year with Savings')
                }
              >
                New Year's Eve
              </Button>
            </InlineStack>
          </Card>

          {/* Color Customization */}
          <Card sectioned>
            <InlineStack spacing="loose" align="start">
              <div style={{ flex: 1 }}>
                <TextField
                  label="Font Color"
                  value={fontColor}
                  onChange={(val) => setFontColor(val)}
                  type="text"
                />
                <RgbaColorPicker
                  color={fontColor}
                  onChange={setFontColor}
                />
              </div>
              <div style={{ flex: 1 }}>
                <TextField
                  label="Background Color"
                  value={backgroundColor}
                  onChange={(val) => setBackgroundColor(val)}
                  type="text"
                />
                <RgbaColorPicker
                  color={backgroundColor}
                  onChange={setBackgroundColor}
                />
              </div>
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
