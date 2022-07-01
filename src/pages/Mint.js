import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Button, Grid, Card, CardHeader, CardContent, TextField, Stack } from '@mui/material';
import { create } from 'ipfs-http-client'
import LoadingButton from '@mui/lab/LoadingButton';
// components
import Page from '../components/Page';
//

// import newNFT from "../apis/newNFT.json";
// import newNFT_metadata from "../apis/newNFT_metadata.json";


const Input = styled('input')({
    display: 'none',
});

const MintBox = styled(Card)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
})

const CustomImg = styled("img")({
    marginBottom: "20px",
    marginTop: "20px",
    borderRadius: "15px"
})

const CustomStack = styled(Stack)({
    marginBottom: "20px",
})

// ----------------------------------------------------------------------
const client = create('https://ipfs.infura.io:5001/api/v0')

export default function Mint() {
    const [fileUrl, updateFileUrl] = useState(``)
    const [nftName, setNftName] = useState(``)
    const [loading, setLoading] = useState(false)

    console.log(fileUrl);

    const handleMint = () => {
        console.log(nftName, fileUrl);
    }

    const onChange = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            updateFileUrl(url);
            setLoading(false);
        } catch (error) {
            console.log('Error uploading file: ', error)
            setLoading(false);
        }
    }
    return (
        <Page title="Dashboard: Mint | Minimal-UI">
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    MINTING NFT
                </Typography>
                <Grid item xs={12} sm={6} md={12}>
                    <MintBox>
                        <CardHeader title="Create new NFTs" />
                        <CardContent>
                            <CustomStack>
                                <TextField
                                    value={nftName}
                                    fullWidth
                                    autoComplete="nftname"
                                    type="text"
                                    label="NFT Name"
                                    size="small"
                                    onChange={(e) => setNftName(e.target.value)}
                                />
                            </CustomStack>
                            {
                                fileUrl && (
                                    <CustomImg alt="" src={fileUrl} width="230px" />
                                )
                            }
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" onChange={onChange} id="contained-button-file" type="file" />
                                {
                                    loading ?
                                        <LoadingButton loading variant="contained" style={{ width: "230px" }}>
                                            Submit
                                        </LoadingButton>
                                        :
                                        <Button variant="contained" component="span" style={{ width: "230px" }}>
                                            Select File
                                        </Button>
                                }
                            </label>
                            <br />
                            <br />
                            <Button variant="contained" onClick={handleMint} component="span" style={{ width: "230px" }}>
                                Create
                            </Button>
                        </CardContent>
                    </MintBox>
                </Grid>
            </Container>
        </Page >
    );
}

