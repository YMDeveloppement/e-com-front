import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormProductInfo from '@/components/admin/products/formproductinfo';
import '@/assets/css/admin/productslist.scss';
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function AddProduct() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [images, setImages] = React.useState([]);
  const handleChangeImg = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previews]);
  };
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }} className="add-product-container">
      <FormProductInfo />
      <div className="d-none image-preview-container">


        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                aria-controls="stepper-content"
                color="inherit"
                onClick={handleStep(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div id="stepper-content">
          <React.Fragment>
            {activeStep === 0 ? <div className="upload-container">

            </div> : (activeStep === 1 ? <Typography variant="h6" >
            </Typography> : <Typography variant="h6" >
              Step 3: Create an ad
            </Typography>)}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}
                disabled={activeStep === (steps.length - 1)}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        </div>
      </div>
    </Box>

  );
}
