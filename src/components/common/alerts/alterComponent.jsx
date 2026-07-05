import { useState } from "react";
import {
    Card,
    Modal,
    Box,
    Typography,
    Button,
} from "@mui/material";

import {
    faTriangleExclamation,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
export default function AlertCompo({
    modalInfo,
    onClick,
    openIt }) {

    const isSuccess = modalInfo.type === "success";

    const mainColor = isSuccess ? "#22c55e" : "#ef4444";

    return (
        <>
            <div className="modelllll" style={{ backgroundColor: 'transparent' }} >
                <Modal
                    open={openIt}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card
                        elevation={6}
                        style={style}
                        sx={{
                            width: 360,
                            height: 480,
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 1,
                        }}
                    >
                        {/* Top Background Circle */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: -120,
                                left: -50,
                                width: 450,
                                height: 300,
                                borderRadius: "50%",
                                bgcolor: "#f5f5f5",
                            }}
                        />

                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                pt: 10,
                                px: 4,
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    width: 110,
                                    height: 110,
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                {isSuccess ? (
                                    <Box
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            bgcolor: mainColor,
                                            borderRadius: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            size="3x"
                                            color="white"
                                        />
                                    </Box>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faTriangleExclamation}
                                        size="5x"
                                        color={mainColor}
                                    />
                                )}
                            </Box>

                            {/* Title */}
                            <Typography
                                variant="h4"
                                sx={{
                                    color: mainColor,
                                    fontWeight: 500,
                                    mb: 3,
                                }}
                            >
                                {modalInfo.title}
                            </Typography>

                            {/* Message */}
                            <Typography
                                align="center"
                                sx={{
                                    color: "#9e9e9e",
                                    fontSize: "1rem",
                                    maxWidth: 220,
                                    mb: 5,
                                    lineHeight: 1.5,
                                }}
                            >
                                {modalInfo.message}
                            </Typography>

                            {/* Button */}
                            <Button
                                variant="contained"
                                onClick={modalInfo.onClick}
                                sx={{
                                    bgcolor: mainColor,
                                    px: 5,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    boxShadow: "0 4px 10px rgba(0,0,0,.15)",
                                    "&:hover": {
                                        bgcolor: mainColor,
                                    },
                                }}
                            >
                                {modalInfo.buttonText}
                            </Button>
                        </Box>
                    </Card>
                </Modal>
            </div>
        </>
    )
}