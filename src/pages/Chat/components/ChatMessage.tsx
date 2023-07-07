import { useState } from 'react';
import stringToHtml from 'html-react-parser';
import { Card, CardContent } from '@mui/material';
import { ChatCompletionRequestMessage, ChatCompletionRoleEnum } from 'types/OpenAi';
import { SDSColorsSemantic } from 'components/ui/Colours';

const ChatMessage = ({ message }: { message: ChatCompletionRequestMessage }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => setExpanded(!expanded);

    const isAi = message.role === ChatCompletionRoleEnum.Assistant;

    return (
        <Card
            variant="outlined"
            onClick={handleExpand}
            style={{
                padding: '10px',
                margin: '20px',
                maxWidth: '400px',
                minHeight: 'max-content',
                float: isAi ? 'left' : 'right',
                clear: 'both',
            }}
            sx={
                isAi
                    ? {
                          backgroundColor: SDSColorsSemantic.brandPrimary,
                          color: SDSColorsSemantic.surface,
                      }
                    : {
                          backgroundColor: SDSColorsSemantic.surface,
                          color: SDSColorsSemantic.onBackgroundSecondary,
                      }
            }
        >
            <CardContent style={{ padding: '8px' }}>
                {stringToHtml(message.content.replace(/\n/g, '<br>'))}
            </CardContent>
        </Card>
    );
};

export default ChatMessage;
