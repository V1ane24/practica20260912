import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { estudianteSchema } from '../../schemas/estudiante.schema';

export default function EstudianteDialog({ open, onClose, onSave, estudiante }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(estudianteSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      edad: 18,
    },
  });

  useEffect(() => {
    if (estudiante) {
      setValue('nombre', estudiante.nombre);
      setValue('apellido', estudiante.apellido);
      setValue('email', estudiante.email);
      setValue('edad', Number(estudiante.edad));
    } else {
      reset({
        nombre: '',
        apellido: '',
        email: '',
        edad: 18,
      });
    }
  }, [estudiante, open, setValue, reset]);

  const onSubmit = (data) => {
    onSave({
      ...data,
      edad: Number(data.edad),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {estudiante ? 'Editar Estudiante' : 'Nuevo Estudiante'}
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              {...register('nombre')}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />
            <TextField
              label="Apellido"
              fullWidth
              margin="normal"
              {...register('apellido')}
              error={!!errors.apellido}
              helperText={errors.apellido?.message}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Edad"
              type="number"
              fullWidth
              margin="normal"
              {...register('edad', { valueAsNumber: true })}
              error={!!errors.edad}
              helperText={errors.edad?.message}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}