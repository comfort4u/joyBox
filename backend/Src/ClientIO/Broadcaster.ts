import * as socketIo from 'socket.io';

import {
    ArchiveRecord,
    ClipProgress,
    ClipProgressInit,
    Exact,
    LastSeenInfo,
    PluginState,
    RecordingProgressInfo,
    ReorderObservablePluginInfo,
    ReorderPluginInfo,
    Streamer,
    SystemInfo
} from '@Shared/Types';

export class Broadcaster {
    public constructor(private io: socketIo.Server) { }
    // Channel
    public AddObservable(observable: Streamer) {
        this.io.emit('AddObservable', observable);
    }
    public RemoveObservable(url: string) {
        this.io.emit('RemoveObservable', url);
    }
    public ReorderObservablePlugin(stream: ReorderObservablePluginInfo) {
        this.io.emit('ReorderObservablePlugin', stream);
    }
    public UpdateLastSeen<T>(info: Exact<T, LastSeenInfo>) {
        this.io.emit('UpdateLastSeen', info);
    }
    // Plugin
    public EnablePlugin(target: PluginState) {
        this.io.emit('EnablePlugin', target);
    }
    public RedorderPlugin(transition: ReorderPluginInfo) {
        this.io.emit('ReorderPlugin', transition);
    }
    // Recording
    public NewRecording(source: string) {
        this.io.emit('AddActiveRecord', source);
    }
    public RecordingProgress<T>(progress: Exact<T, RecordingProgressInfo>) {
        this.io.emit('RecordingProgress', progress);
    }
    public RemoveRecording(source: string) {
        this.io.emit('RemoveRecording', source);
    }
    // Archive
    public AddArchiveRecord(record: ArchiveRecord) {
        this.io.emit('AddArchiveRecord', record);
    }
    public RemoveArchiveRecord(filename: string) {
        this.io.emit('RemoveArchiveRecord', filename);
    }
    public LockRecord(filename: string) {
        this.io.emit('LockRecord', filename);
    }
    public UnlockRecord(filename: string) {
        this.io.emit('UnlockRecord', filename);
    }
    // Clip
    public NewClipProgress<T>(info: Exact<T, ClipProgressInit>) {
        this.io.emit('AddClipProgress', info);
    }
    public ClipProgress<T>(info: Exact<T, ClipProgress>) {
        this.io.emit('ClipProgress', info);
    }
    public RemoveClipProgress(filename: string) {
        this.io.emit('RemoveClipProgress', filename);
    }
    // System monitor
    public SystemMonitorUpdate<T>(info: Exact<T, SystemInfo>) {
        this.io.emit('SystemMonitorUpdate', info);
    }
}
