// CommunityTasks/index.tsx
import React from 'react';
import styled from "@emotion/styled";
import { Typography, Link } from "@mui/material";
import TaskCard from "../../pages/Coop/CoopComponents/TaskCard"; // Ensure correct path for TaskCard
import { Community } from "../../models/communitymodel";  // Ensure this path is correct

interface CommunityTasksProps {
	label: string;
	seeAllLink: string;
}

// Sample community data
const communityData: Community[] = [
	new Community({
		_id: '1',
		name: 'Green Thumbs',
		description: 'Community for gardening enthusiasts.',
		location: { lat: 34.0522, lng: -118.2437 },
		members: [],
		tags: ['gardening', 'sustainability'],
		images: [{
			contentType: 'image/jpeg',
			path: 'path_to_gardening_community_image.jpg'
		}]
	}),
	// Add more communities as needed
];

// Styled components
const CommunityContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    background-color: #F3F3F3; // Light grey background for the container
    border-radius: 10px;
    padding: 30px;
    max-height: 638px;
    overflow: auto;
`;

const ContainerHeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const LabelStyled = styled(Typography)`
    font-size: 20px;
    font-weight: bold;
    color: black;
`;

const SeeAllLinkStyled = styled(Link)`
    font-size: 16px;
    color: black;
    text-decoration: none;
`;

// Component to display communities using TaskCard
const CommunityTasks: React.FC<CommunityTasksProps> = ({ label, seeAllLink }) => {
	return (
		<CommunityContainer>
			<ContainerHeaderStyled>
				<LabelStyled>{label}</LabelStyled>
				<SeeAllLinkStyled href={seeAllLink}>See all</SeeAllLinkStyled>
			</ContainerHeaderStyled>
			{communityData.map((community, index) => (
				<TaskCard
					key={community.id}
					name={community.name}
					community={community.description}
					location={`${community.location?.lat}, ${community.location?.lng}`}
					description={`Tags: ${community.tags?.join(', ')}`}
					type="large"
				/>
			))}
		</CommunityContainer>
	);
};

export default CommunityTasks;
