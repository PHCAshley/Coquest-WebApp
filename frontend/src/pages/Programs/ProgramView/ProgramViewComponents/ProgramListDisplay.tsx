import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import ProgramPane from "./ProgramPane";
import { Program } from "../../ProgramComponents/TypeDefinitions/Program";

const Container = styled("div")({
	display: "flex",
	margin: "auto",
	marginTop: 40,
	width: "100%",
	alignItems: "center",
	flexDirection: "column",
	overflowY: "scroll",
	height: 600,
	"&::-webkit-scrollbar": {
		width: "0.5em",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "rgba(0,0,0,.5)",
		borderRadius: "10px",
	},
	"&::-webkit-scrollbar-track": {
		backgroundColor: "rgba(0,0,0,.2)",
		borderRadius: "10px",
	},
});

interface ProgramProps {
	programList: Program[];
}
const Breaker = styled("hr")({
	height: 2,
	width: "90%",
});

const ProgramListDisplay = (props: ProgramProps) => {
	const validProgramList: Program[] =
		props.programList.filter(validateProgram);

	return (
		<Container>
			{validProgramList.map((program, index) => {
				return (
					<React.Fragment key={index}>
						<ProgramPane program={program} />
						{index + 1 <= props.programList.length && (
							<Breaker></Breaker>
						)}
					</React.Fragment>
				);
			})}
		</Container>
	);
};
const validateProgram = (program: Program) => {
	if (
		program === null ||
		program.name === null ||
		program.name === "" ||
		program.description === null ||
		program.description === ""
	) {
		return false;
	}
	return true;
};
export default ProgramListDisplay;
