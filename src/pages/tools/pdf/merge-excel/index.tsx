import { ToolComponentProps } from '@tools/defineTool';
import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ToolFileResult from '@components/result/ToolFileResult';
import { mergeExcelFiles } from './service';
import { useTranslation } from 'react-i18next';

export default function MergeExcel({ title }: ToolComponentProps) {
  const { t } = useTranslation('pdf');
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<File | null>(null);

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setResult(await mergeExcelFiles(files));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        {t('mergeExcel.addFiles')}
        <input
          type="file"
          hidden
          multiple
          accept=".xls,.xlsx"
          onChange={handleFileAdd}
        />
      </Button>

      {files.length > 0 && (
        <List>
          {files.map((file, i) => (
            <ListItem
              key={i}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemove(i)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024).toFixed(1)} KB`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleMerge}
        disabled={files.length < 2}
        sx={{ mt: 1, mb: 2 }}
      >
        {t('mergeExcel.merge')} ({files.length} {t('mergeExcel.files')})
      </Button>

      <ToolFileResult
        value={result}
        title={t('mergeExcel.resultTitle')}
        extension="xlsx"
      />
    </Box>
  );
}
