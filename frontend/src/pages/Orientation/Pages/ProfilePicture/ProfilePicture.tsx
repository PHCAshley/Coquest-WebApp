import { useBatchAddListener, useBatchFinishListener, withRequestPreSendUpdate } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useState } from "react";
import { FileLike } from "@rpldy/shared";
import { UploadPreview } from "@rpldy/upload-preview"
import styled from "styled-components";
import { Button } from "@mui/material";
import CropperComponent from "./Cropper";
import { generateProfileImg, userModel } from "../../../../models/userobserver";

const CenterContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

// Error type with similiar shape to the error type Uploady expects in its error-handling callback functions
interface FileInvalidEventDetail {
    file: FileLike; // The File object that was attempted to be uploaded
    issues: {
        [key: string]: boolean; // A map of issues encountered with the file, e.g., type, size
    };
}

function getErrorMsg(err: FileInvalidEventDetail) {
    let msg = '';
    if(err) {
        msg += `Could not upload ${err.file.name}: `;

        if(err.issues.accept) {
            msg += `invalid file type. Only image files are acceptable.`;
        } else if(err.issues.size) {
            msg += `file too large.`;
        } else {
            // TODO: Report other possible errors
            msg += `Unknown error`;
        }
    }
    return msg;
}

// Image Pre-processing
const itemPreview = withRequestPreSendUpdate(({id, url, updateRequest, requestData }: any) => {
    return (
        <div>
            <CropperComponent
                id={id}
                src={url}
                updateRequest={updateRequest}
                requestData={requestData} />
        </div>
    );
});

function ProfilePicture(props: any) {
    const [user, setUser] = useState(userModel);
    const [filesAdded, setFilesAdded] = useState(false);
    const [inputError, setInputError] = useState<FileInvalidEventDetail | null>(null);

    // Throw error if uploaded file is not of image type and bar Uploady from uploading the offending file
    useBatchAddListener((batch) => {
        const index = batch.items.findIndex((item) => 
            !item.file.type.startsWith("image/")
        );
        
        if (index >= 0) {
            setInputError({
                file: batch.items[index].file,
                issues: { accept: true }
            });
            return false; // Prevents the upload from starting
        } else {
            setInputError(null);
            setFilesAdded(true);
            return true;
        }
    });

    useBatchFinishListener((batch) => {
        // TODO: Retrieve the upload URL
        // const item = batch.items[0] 
        // props.updateData([{ contentType: item.file.type, path: item.uploadResponse }]);
    });

    function generateImg() {
        setUser(prevUser => ({...prevUser, image: [generateProfileImg()]}));
    }

    return (
        <CenterContainer>
            {inputError && (
                <div>{getErrorMsg(inputError)}</div>
            )}
            
            <UploadButton  />

            {!filesAdded ?
                <>
                    <img 
                        src={user.image[0].path}
                        alt="default upload" 
                    />
                    <Button onClick={generateImg}>Generate New Profile Image</Button>
                </> :            
                <UploadPreview
                    PreviewComponent={itemPreview}
                />
            }
        </CenterContainer>
    );
}

export default ProfilePicture;
